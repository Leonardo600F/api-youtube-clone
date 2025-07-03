"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const signIn = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: "Token não  fornecido." });
        }
        const decoded = (0, jsonwebtoken_1.verify)(req.headers.authorization, process.env.SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Login não autorizado.' });
    }
};
exports.signIn = signIn;
