"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("../../../mysql");
const uuid_1 = require("uuid");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
class UsersRepository {
    createUser(request, response) {
        const { name, email, password } = request.body;
        try {
            mysql_1.pool.getConnection((err, connection) => {
                (0, bcrypt_1.hash)(password, 10, (err, hash) => {
                    if (err) {
                        return response.status(500).json(err);
                    }
                    connection.query('SELECT email FROM users WHERE email = ?', [email], (error, result, fields) => {
                        if (error) {
                            connection.release();
                            return response.status(500).json(error);
                        }
                        if (result.length > 0) {
                            connection.release();
                            return response.status(409).json({ message: "E-mail já existente." });
                        }
                        connection.query('INSERT INTO users (user_id, name, email, password) VALUES (?,?,?,?)', [(0, uuid_1.v4)(), name, email, hash], (error, result, fields) => {
                            connection.release();
                            if (error) {
                                return response.status(400).json(error);
                            }
                            response.status(200).json({ message: "Usuário criado com sucesso." });
                        });
                    });
                });
            });
        }
        catch (error) {
            return response.status(500).json({ error: "Erro ao criar usuário.", details: error });
        }
    }
    signIn(request, response) {
        const { email, password } = request.body;
        try {
            mysql_1.pool.getConnection((err, connection) => {
                connection.query('SELECT * FROM users WHERE email = ?', [email], (error, results, fields) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json({ error: "Erro na sua autenticação." });
                    }
                    if (results.length === 0) {
                        return response.status(400).json({ error: "Usuário não encontrado." });
                    }
                    (0, bcrypt_1.compare)(password, results[0].password, (err, result) => {
                        if (err) {
                            return response.status(400).json({ error: "Erro na sua autenticação." });
                        }
                        if (result) {
                            const token = (0, jsonwebtoken_1.sign)({
                                id: results[0].user_id,
                                email: results[0].email
                            }, process.env.SECRET, { expiresIn: "1d" });
                            return response.status(200).json({ token: token, message: "Autenticado com sucesso." });
                        }
                        else {
                            return response.status(400).json({ error: "Usuário ou senha incorretos. Verifique os dados novamente." });
                        }
                    });
                });
            });
        }
        catch (error) {
            return response.status(500).json({ error: "Erro ao fazer login.", details: error });
        }
    }
    getUser(request, response) {
        var _a;
        const token = (_a = request.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            return response.status(401).json({ error: "Token não fornecido." });
        }
        try {
            const decoded = (0, jsonwebtoken_1.verify)(token, process.env.SECRET);
            mysql_1.pool.getConnection((err, connection) => {
                connection.query('SELECT user_id, name, email FROM users WHERE user_id = ?', [decoded.id], (error, results, fields) => {
                    connection.release();
                    if (error) {
                        return response.status(500).json({ error: "Erro ao buscar usuário." });
                    }
                    if (results.length === 0) {
                        return response.status(404).json({ error: "Usuário não encontrado." });
                    }
                    return response.status(200).json(results[0]);
                });
            });
        }
        catch (error) {
            return response.status(401).json({ error: "Token inválido." });
        }
    }
}
exports.default = UsersRepository;
