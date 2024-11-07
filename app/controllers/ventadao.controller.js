const db = require("../models");
const Ventas = db.Ventas;
const Op = db.Sequelize.Op;
exports.create = (req, res) => {
    // Validate request
    if (!req.body.factura) {
        res.status(400).send({
            message: "Debe enviar numero de factura!"
        });
        return;
    } else if (!req.body.cliente_id) {
        res.status(400).send({
            message: "Debe enviar id de cliente!"
        });
        return;
    } else if (!req.body.total) {
        res.status(400).send({
            message: "Debe enviar el monto de la compra!"
        });
        return;
    }
    // crea una venta
    const venta = {
        cliente_id: req.body.cliente_id,
        factura: req.body.factura,
        total: req.body.total
    };
    // Guardamos a la base de datos
    Ventas.create(venta)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error al crear una venta."
            });
        });
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

