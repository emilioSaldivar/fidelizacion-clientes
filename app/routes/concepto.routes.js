// routes/concepto.routes.js
const express = require("express");
const router = express.Router();
const conceptoController = require("../controllers/concepto.controller.js");

router.post("/conceptos", conceptoController.createConcepto);
router.get("/conceptos", conceptoController.getConceptos);
router.put("/conceptos/:id", conceptoController.updateConcepto);
router.delete("/conceptos/:id", conceptoController.deleteConcepto);

module.exports = router;
