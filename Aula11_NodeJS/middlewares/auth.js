const jwt = require('jsonwebtoken');

require('dotenv').config();

const auth = async (request, response, next) => {
    console.log(`Middleware auth executado para a rota: ${request.path}`);
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        console.log(`Erro...`);
        return response.status(401).json({ message: 'Token é obrigatório!' });
    }

    const [, token] = authHeader.split(' ');

    try {
        const senha = process.env['JWT_PASSWORD'];
        await jwt.verify(token, senha);
        next();
    } catch (error) {
        return response.status(401).json({ message: 'Token Inválido!' });
    }
};

module.exports = auth;
