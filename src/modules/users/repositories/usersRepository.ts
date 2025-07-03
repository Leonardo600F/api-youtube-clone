import { pool } from "../../../mysql";
import { v4 as uuidv4 } from 'uuid';
import { hash, compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { Request, Response } from "express";


export default class UsersRepository {

    createUser(request: Request, response: Response) {
        const { name, email, password } = request.body;

        try {

            pool.getConnection((err: any, connection: any) => {
                hash(password, 10, (err, hash) => {
                    if (err) {
                        return response.status(500).json(err);
                    }

                    connection.query(
                        'SELECT email FROM users WHERE email = ?',
                        [email],
                        (error: any, result: any, fields: any) => {
                            if (error) {
                                connection.release();
                                return response.status(500).json(error);
                            }

                            if (result.length > 0) {
                                connection.release();
                                return response.status(409).json({ message: "E-mail já existente." });
                            }

                            connection.query(
                                'INSERT INTO users (user_id, name, email, password) VALUES (?,?,?,?)',
                                [uuidv4(), name, email, hash],
                                (error: any, result: any, fields: any) => {
                                    connection.release();

                                    if (error) {
                                        return response.status(400).json(error);
                                    }

                                    response.status(200).json({ message: "Usuário criado com sucesso." });
                                }
                            )
                        }
                    )
                })
            })

        } catch (error) {
            return response.status(500).json({ error: "Erro ao criar usuário.", details: error });
        }
    }

    signIn(request: Request, response: Response) {
        const { email, password } = request.body;

        try {
            pool.getConnection((err: any, connection: any) => {
                connection.query(
                    'SELECT * FROM users WHERE email = ?',
                    [email],
                    (error: any, results: any, fields: any) => {
                        connection.release();

                        if (error) {
                            return response.status(400).json({ error: "Erro na sua autenticação." });
                        }

                        if (results.length === 0) {
                            return response.status(400).json({ error: "Usuário não encontrado." });
                        }

                        compare(password, results[0].password, (err, result) => {
                            if (err) {
                                return response.status(400).json({ error: "Erro na sua autenticação." });
                            }

                            if (result) {
                                const token = sign({
                                    id: results[0].user_id,
                                    email: results[0].email
                                }, process.env.SECRET as string, { expiresIn: "1d" })

                                return response.status(200).json({ token: token, message: "Autenticado com sucesso." });
                            } else {
                                return response.status(400).json({ error: "Usuário ou senha incorretos. Verifique os dados novamente." });
                            }
                        })
                    }
                )
            })
        } catch (error) {
            return response.status(500).json({ error: "Erro ao fazer login.", details: error });
        }
    }

    getUser(request: Request, response: Response) {
        const token = request.headers.authorization?.split(' ')[1];

        if (!token) {
            return response.status(401).json({ error: "Token não fornecido." });
        }

        try {
            const decoded = verify(token, process.env.SECRET as string) as { id: string, email: string };

            pool.getConnection((err: any, connection: any) => {
                connection.query(
                    'SELECT user_id, name, email FROM users WHERE user_id = ?',
                    [decoded.id],
                    (error: any, results: any, fields: any) => {
                        connection.release();

                        if (error) {
                            return response.status(500).json({ error: "Erro ao buscar usuário." });
                        }

                        if (results.length === 0) {
                            return response.status(404).json({ error: "Usuário não encontrado." });
                        }

                        return response.status(200).json(results[0]);
                    }
                );
            });
        } catch (error) {
            return response.status(401).json({ error: "Token inválido." });
        }
    }
}