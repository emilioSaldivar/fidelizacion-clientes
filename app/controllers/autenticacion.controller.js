const jwt = require('jsonwebtoken');
require('dotenv').config();

// Simulación de la base de datos de usuarios (esto debería ser reemplazado con una base de datos real)
const usuarios = [
    { id: 1, username: 'admin', password: 'password123' }, // Ejemplo de usuario
];

// Endpoint para autenticación y generación de token JWT
exports.login = (req, res) => {
    const { username, password } = req.body;

    const usuario = usuarios.find(u => u.username === username && u.password === password);

    if (!usuario) {
        return res.status(401).json({ message: 'Usuario o contraseña incorrectos.' });
    }

    // Generar un token JWT
    const token = jwt.sign({ id: usuario.id, username: usuario.username }, process.env.JWT_SECRET, { expiresIn: '8h' });

    res.json({ token });
};
