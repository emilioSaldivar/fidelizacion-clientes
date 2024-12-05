const db = require("../models");
const Ventas = db.Ventas;
const BolsaPuntos = db.bolsa_puntos;
const ReglaAsignacion = db.reglas_asignacion;
const ReglaVencimiento = db.vencimiento_puntos;
const Referido = db.referidos;
const Op = db.Sequelize.Op;
exports.create = async (req, res) => {
    try {
        // Validación de campos
        if (!req.body.factura) {
            return res.status(400).send({ message: "Debe enviar número de factura!" });
        } else if (!req.body.cliente_id) {
            return res.status(400).send({ message: "Debe enviar id de cliente!" });
        } else if (!req.body.total) {
            return res.status(400).send({ message: "Debe enviar el monto de la compra!" });
        }

        // Creación de la venta
        const venta = {
            cliente_id: req.body.cliente_id,
            factura: req.body.factura,
            total: req.body.total
        };

        // Guardar la venta en la base de datos
        const nuevaVenta = await Ventas.create(venta);

        // Obtener la regla de asignación de puntos según el monto de la venta
        const reglaAsignacion = await ReglaAsignacion.findOne({
            where: {
                limite_inferior: { [Op.lte]: venta.total },
                limite_superior: { [Op.gte]: venta.total }
            }
        });

        if (!reglaAsignacion) {
            return res.status(500).send({ message: "No se encontró una regla de asignación de puntos para este monto." });
        }

        // Calcular puntaje asignado
        const puntajeAsignado = Math.floor(venta.total / reglaAsignacion.equivalencia_puntos);
if (puntajeAsignado > 0) {
        // Determinar la fecha de caducidad del puntaje (por ejemplo, 1 año después de la asignación)
        const fechaAsignacion = new Date();
        const fechaCaducidad = new Date();
        // Obtener regla de vencimiento de puntos
        const reglaVencimiento = await ReglaVencimiento.findOne({
            where: {
                fecha_inicio: { [Op.lte]: fechaAsignacion },
                fecha_fin: { [Op.gte]: fechaAsignacion }
            }
        });

        if (!reglaVencimiento) {
            return res.status(500).send({ message: "No se encontró una regla de vencimiento de puntos o descuento para este monto." });
        } else {
            fechaCaducidad.setDate(fechaCaducidad.getDate() + reglaVencimiento.duracion_dias);
        }

        // ### Verificar si es la primera compra y si tiene referidor
        const referido = await Referido.findOne({
            where: { referido_id: venta.cliente_id }
        });

        if (referido) {
            // Verificar si la primera compra ha sido realizada
            if (referido.primera_compra_realizada) {
                // Duplica los puntos para el cliente
                const puntosDuplicados = puntajeAsignado * 2;
                const bolsaPuntosCliente = {
                    cliente_id: venta.cliente_id,
                    venta_id: nuevaVenta.id,
                    fecha_asignacion: fechaAsignacion,
                    fecha_caducidad: fechaCaducidad,
                    puntaje_asignado: puntosDuplicados,
                    puntaje_utilizado: 0,
                    saldo_puntos: puntosDuplicados,
                    monto_operacion: venta.total
                };
                await BolsaPuntos.create(bolsaPuntosCliente);

                // Asigna puntos al referidor
                const bolsaPuntosReferidor = {
                    cliente_id: referido.referidor_id,
                    venta_id: nuevaVenta.id,
                    fecha_asignacion: fechaAsignacion,
                    fecha_caducidad: fechaCaducidad,
                    puntaje_asignado: puntajeAsignado,
                    puntaje_utilizado: 0,
                    saldo_puntos: puntajeAsignado,
                    monto_operacion: venta.total
                };
                await BolsaPuntos.create(bolsaPuntosReferidor);
                
                // Marcar que la primera compra ya fue realizada
                await Referido.update(
                    { primera_compra_realizada: false },  // Solo actualizar este campo
                    { where: { id: referido.id } }       // Condición para encontrar el registro
                );

            }
        } else {
            // Si no existe el referido, crear el registro estándar para clientes sin referidor
            const bolsaPuntos = {
                cliente_id: venta.cliente_id,
                venta_id: nuevaVenta.id,
                fecha_asignacion: fechaAsignacion,
                fecha_caducidad: fechaCaducidad,
                puntaje_asignado: puntajeAsignado,
                puntaje_utilizado: 0,
                saldo_puntos: puntajeAsignado,
                monto_operacion: venta.total
            };
            await BolsaPuntos.create(bolsaPuntos);
        }
        // Responder con los datos de la venta y estado 200
        res.status(200).send({
            message: "Venta creada exitosamente.",
            venta: venta,
            puntaje_referidor: puntajeAsignado,
            puntaje_referido: puntajeAsignado*2
        });
    } else{
        // Responder con los datos de la venta y estado 200
        res.status(200).send({
            message: "Venta creada exitosamente.",
            venta: venta,
            puntajeAsignado: puntajeAsignado
        });
    }
        
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ha ocurrido un error al crear la venta y la bolsa de puntos."
        });
    }
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Ventas.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener venta con id=" + id
            });
        });
};
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { cliente: { [Op.iLike]: `%${nombre}%` } } : null;

    Ventas.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al obtener las ventas."
            });
        });
};

