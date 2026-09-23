import { pool } from "../../../mysql";
import { v4 as uuidv4 } from 'uuid';
import { hash, compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';

export default class UsersRepository {
    async createUser(
        name: string,
        surname: string,
        email: string,
        nickname: string,
        password: string
    ) {
        try {

            return new Promise((resolve, reject) => {

                pool.getConnection((err: any, connection: any) => {

                    if (err) {
                        reject(new Error("Erro ao conectar ao banco."));
                        return;
                    }

                    hash(password, 10, (err, hash) => {

                        if (err) {
                            connection.release();
                            reject(new Error("Erro ao criar usuário."));
                            return;
                        }

                        connection.query(
                            'SELECT email FROM users WHERE email = ?',
                            [email],
                            (error: any, result: any, fields: any) => {

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

                                connection.query(
                                    'INSERT INTO users (user_id, name, surname, email, nickname, password) VALUES (?,?,?,?,?,?)',
                                    [uuidv4(), name, surname, email, nickname, hash],
                                    (error: any, result: any, fields: any) => {

                                        connection.release();

                                        if (error) {
                                            reject(new Error("Erro ao criar usuário."));
                                            return;
                                        }

                                        resolve({
                                            message: "Usuário criado com sucesso."
                                        });
                                    }
                                );
                            }
                        );
                    });
                });
            });

        } catch (error) {
            throw new Error("Erro ao criar usuário.");
        }
    }

    async signIn(email: string, password: string) {

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