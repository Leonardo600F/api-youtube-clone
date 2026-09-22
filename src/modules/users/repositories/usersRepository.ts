import { pool } from "../../../mysql";
import { v4 as uuidv4 } from 'uuid';
import { hash, compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { Request, Response } from "express";


export default class UsersRepository {

    async createUser(
        name: string,
        surname: string,
        email: string,
        nickname: string,
        password: string

    )

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
                        'INSERT INTO users (user_id, name, surname, email, nickname, password) VALUES (?,?,?,?,?,?)',
                        [uuidv4(), name, surname, email, nickname, hash],
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

    async signIn(email: string, password: string) {
    try {
        return new Promise((resolve, reject) => {

            pool.getConnection((err: any, connection: any) => {

                if (err) {
                    reject(new Error("Erro ao conectar ao banco."));
                    return;
                }

                connection.query(
                    'SELECT * FROM users WHERE email = ?',
                    [email],
                    (error: any, results: any, fields: any) => {

                        connection.release();

                        if (error) {
                            reject(new Error("Erro na sua autenticação."));
                            return;
                        }

                        if (results.length === 0) {
                            reject(new Error("Usuário não encontrado."));
                            return;
                        }

                        compare(
                            password,
                            results[0].password,
                            (err, result) => {

                                if (err) {
                                    reject(new Error("Erro na sua autenticação."));
                                    return;
                                }

                                if (result) {
                                    const token = sign(
                                        {
                                            id: results[0].user_id,
                                            email: results[0].email
                                        },
                                        process.env.SECRET as string,
                                        { expiresIn: "1d" });

                                    resolve({
                                        token: token,
                                        message: "Autenticado com sucesso."
                                    });

                                } else { reject(new Error("Usuário ou senha incorretos. Verifique os dados novamente.")); }
                            }
                        );
                    }
                );
            });
        });

    } catch (error) {
        throw new Error("Erro ao fazer login.");
    }
}

    async getUser(token: string) {
    try {
        const decoded = verify(
            token,
            process.env.SECRET as string
        ) as { id: string, email: string };

        return new Promise((resolve, reject) => {
            pool.getConnection((err: any, connection: any) => {

                if (err) {
                    reject(new Error("Erro ao conectar ao banco."));
                    return;
                }

                connection.query(
                    'SELECT user_id, name, surname, email, nickname FROM users WHERE user_id = ?',
                    [decoded.id],
                    (error: any, results: any, fields: any) => {

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
                    }
                );
            });
        });

    } catch (error) {
        throw new Error("Token inválido.");
    }
}
}