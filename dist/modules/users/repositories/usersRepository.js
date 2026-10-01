"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("../../../mysql");
const uuid_1 = require("uuid");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
class UsersRepository {
    createUser(name, surname, email, nickname, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return new Promise((resolve, reject) => {
                    mysql_1.pool.getConnection((err, connection) => {
                        if (err) {
                            reject(new Error("Erro ao conectar ao banco."));
                            return;
                        }
                        (0, bcrypt_1.hash)(password, 10, (err, hash) => {
                            if (err) {
                                connection.release();
                                reject(new Error("Erro ao criar usuário."));
                                return;
                            }
                            connection.query('SELECT email FROM users WHERE email = ?', [email], (error, result, fields) => {
                                if (error) {
                                    connection.release();
                                    reject(new Error("Erro ao verificar e-mail."));
                                    return;
                                }
                                if (result.length > 0) {
                                    connection.release();
                                    reject(new Error("E-mail já existente."));
                                    return;
                                }
                                connection.query('INSERT INTO users (user_id, name, surname, email, nickname, password) VALUES (?,?,?,?,?,?)', [(0, uuid_1.v4)(), name, surname, email, nickname, hash], (error, result, fields) => {
                                    connection.release();
                                    if (error) {
                                        reject(new Error("Erro ao criar usuário."));
                                        return;
                                    }
                                    resolve({
                                        message: "Usuário criado com sucesso."
                                    });
                                });
                            });
                        });
                    });
                });
            }
            catch (error) {
                throw new Error("Erro ao criar usuário.");
            }
        });
    }
    signIn(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                mysql_1.pool.getConnection((err, connection) => {
                    if (err) {
                        reject(new Error("Erro ao conectar ao banco."));
                        return;
                    }
                    connection.query('SELECT * FROM users WHERE email = ?', [email], (error, results, fields) => {
                        connection.release();
                        if (error) {
                            reject(new Error("Erro na sua autenticação."));
                            return;
                        }
                        if (results.length === 0) {
                            reject(new Error("Usuário não encontrado."));
                            return;
                        }
                        (0, bcrypt_1.compare)(password, results[0].password, (err, result) => {
                            if (err) {
                                reject(new Error("Erro na sua autenticação."));
                                return;
                            }
                            if (result) {
                                const token = (0, jsonwebtoken_1.sign)({
                                    id: results[0].user_id,
                                    email: results[0].email
                                }, process.env.SECRET, { expiresIn: "1d" });
                                resolve({
                                    token: token,
                                    message: "Autenticado com sucesso."
                                });
                            }
                            else {
                                reject(new Error("Usuário ou senha incorretos. Verifique os dados novamente."));
                            }
                        });
                    });
                });
            });
        });
    }
    getUser(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decoded = (0, jsonwebtoken_1.verify)(token, process.env.SECRET);
                return new Promise((resolve, reject) => {
                    mysql_1.pool.getConnection((err, connection) => {
                        if (err) {
                            reject(new Error("Erro ao conectar ao banco."));
                            return;
                        }
                        connection.query('SELECT user_id, name, surname, email, nickname FROM users WHERE user_id = ?', [decoded.id], (error, results, fields) => {
                            connection.release();
                            if (error) {
                                reject(new Error("Erro ao buscar usuário."));
                                return;
                            }
                            if (results.length === 0) {
                                resolve(null);
                                return;
                            }
                            resolve(results[0]);
                        });
                    });
                });
            }
            catch (error) {
                throw new Error("Token inválido.");
            }
        });
    }
}
exports.default = UsersRepository;
