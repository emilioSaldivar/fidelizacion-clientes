// routes/concepto.routes.js
const express = require("express");
const router = express.Router();
const conceptoController = require("../controllers/concepto.controller.js");
const authenticateJWT = require('../middleware/authMiddleware.js');

router.post("/conceptos", authenticateJWT,conceptoController.createConcepto);
router.get("/conceptos", authenticateJWT,conceptoController.getConceptos);
router.put("/conceptos/:id", authenticateJWT,conceptoController.updateConcepto);
router.delete("/conceptos/:id", authenticateJWT,conceptoController.deleteConcepto);

module.exports = router;
