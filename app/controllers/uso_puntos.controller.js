const db = require("../models");
const BolsaPuntos = db.bolsa_puntos;
const UsoPuntos = db.uso_puntos;
const DetalleUsoPuntos = db.detalle_uso_puntos;
const Conceptos = db.Concepto;
const { Op } = db.Sequelize;

exports.usarPuntos = async (req, res) => {
    try {
        const { cliente_id, concepto_id } = req.body;

        // Validar si el cliente y concepto son válidos
        if (!cliente_id || !concepto_id) {
            return res.status(400).send({ message: "Debe enviar el ID del cliente y el ID del concepto." });
        }

        // Obtener el concepto y verificar la cantidad de puntos necesarios
        const concepto = await Conceptos.findByPk(concepto_id);
        if (!concepto) {
            return res.status(404).send({ message: "Concepto no encontrado." });
        }
        const puntosNecesarios = concepto.puntos_requeridos;

        // Obtener las bolsas de puntos del cliente en orden FIFO (por fecha de asignación)
        const bolsas = await BolsaPuntos.findAll({
            where: { cliente_id, saldo_puntos: { [Op.gt]: 0 } },
            order: [["fecha_asignacion", "ASC"]],
        });

        // Verificar si el cliente tiene suficientes puntos en total
        let puntosTotalesDisponibles = bolsas.reduce((total, bolsa) => total + bolsa.saldo_puntos, 0);
        if (puntosTotalesDisponibles < puntosNecesarios) {
            return res.status(400).send({ message: "Puntos insuficientes en las bolsas del cliente." });
        }

        // Crear el registro en uso_puntos
        const usoPuntos = await UsoPuntos.create({
            cliente_id,
            puntaje_utilizado: puntosNecesarios,
            fecha: new Date(),
            concepto_id,
        });

        // Registrar el detalle y actualizar las bolsas de puntos
        let puntosRestantes = puntosNecesarios;
        const detallesUso = [];

        for (const bolsa of bolsas) {
            if (puntosRestantes <= 0) break;

            // Determinar cuántos puntos usar de esta bolsa
            const puntosUsados = Math.min(puntosRestantes, bolsa.saldo_puntos);
            puntosRestantes -= puntosUsados;

            // Actualizar saldo de la bolsa
            bolsa.saldo_puntos -= puntosUsados;
            bolsa.puntaje_utilizado += puntosUsados;
            await bolsa.save();

            // Registrar en detalle_uso_puntos
            const detalleUso = await DetalleUsoPuntos.create({
                uso_puntos_id: usoPuntos.id,
                puntaje_utilizado: puntosUsados,
                bolsa_id: bolsa.id,
            });

            detallesUso.push(detalleUso);
        }

        // Responder con el resultado
        res.status(201).send({
            message: "Puntos utilizados exitosamente",
            usoPuntos,
            detallesUso,
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Error al procesar la solicitud de uso de puntos.",
        });
    }
};
