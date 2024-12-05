const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware para verificar el JWT
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Obtener token del encabezado Authorization

    if (!token) {
        return res.status(403).json({ message: 'Acceso denegado. No se proporcionó token.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Acceso denegado. Token inválido.' });
        }
        req.user = user; // Agregar información del usuario al objeto req
        next(); // Continuar con la ejecución del siguiente middleware o controlador
    });
};

module.exports = authenticateJWT;
