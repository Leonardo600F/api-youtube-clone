"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const signIn = (request, response, next) => {
    try {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            return response.status(401).json({ error: "Token não fornecido" });
        }
        if (!authHeader.startsWith('Bearer ')) {
            return response.status(401).json({ error: "Formato de token inválido" });
        }
        const token = authHeader.substring(7);
        try {
            const decoded = (0, jsonwebtoken_1.verify)(token, process.env.SECRET);
            request.user = decoded;
            next();
        }
        catch (error) {
            return response.status(401).json({ error: "Token inválido" });
        }
    }
    catch (error) {
        return response.status(401).json({ error: "Erro na autenticação" });
    }
};
exports.signIn = signIn;
