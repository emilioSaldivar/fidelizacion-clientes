const db = require("../models");
const BolsaPuntos = db.bolsa_puntos;
const UsoPuntos = db.uso_puntos;
const DetalleUsoPuntos = db.detalle_uso_puntos;
const Conceptos = db.Concepto;
const Cliente = db.cliente; 
const { Op } = db.Sequelize;
const nodemailer = require("nodemailer");
require('dotenv').config();


// Configurar Nodemailer para el envío de correo electrónico
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    service: process.env.MAIL_SERVICE,
    auth: {
            user: process.env.MAIL_USER,  
            pass: process.env.MAIL_PASS         
        }
    });

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
        const nivelRequerido = concepto.nivel ?? 0;

        // Obtener los datos del cliente para el envío de correo electrónico
        const cliente = await Cliente.findByPk(cliente_id);
        if (!cliente) {
            return res.status(404).send({ message: "Cliente no encontrado." });
        }
        
        // Verificar el nivel del cliente
        if (nivelRequerido > cliente.nivel_canje) {
            return res.status(400).send({ message: "El cliente no cumple con el nivel requerido." });
        }
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
        // Modificar el nivel de fidelidad del cliente
        let nivelNuevo = cliente.nivel_canje + 1;
        if (nivelNuevo > 3) nivelNuevo = 0;
        cliente.nivel_canje = nivelNuevo;
        await cliente.save();

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

        

        // Definir el contenido del correo
        const mailOptions = {
            from: process.env.MAIL_USER,
            to: cliente.email,
            subject: "Comprobante de Uso de Puntos",
            text: `
                Estimado ${cliente.nombre} ${cliente.apellido},

                Le informamos que ha utilizado ${puntosNecesarios} puntos en el concepto caje por: "${concepto.descripcion}" el día ${new Date().toLocaleDateString()}.

                Detalle del uso de puntos:
                ${detallesUso.map((detalle, index) => 
                    `- Bolsa #${index + 1}: ${detalle.puntaje_utilizado} puntos`
                ).join('\n')}
                Usted se encuentra en el NIVEL FIDELIDAD: ${cliente.nivel_canje}, y puede canjear conceptos de ese nivel o menores. Mientras más canjes realices más aumentas de nivel de fidelidad.

                Gracias por ser parte de nuestro programa de fidelización.

                Saludos,
                Equipo de Atención al Cliente
            `,
        };

        // Enviar el correo electrónico
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error al enviar el correo:", error);
            } else {
                console.log("Correo enviado: " + info.response);
            }
        });

        // Responder con el resultado
        res.status(201).send({
            message: "Puntos utilizados exitosamente y correo enviado.",
            usoPuntos,
            detallesUso,
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Error al procesar la solicitud de uso de puntos.",
        });
    }
};
