import { pool } from "../../../mysql";
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from "express";

export default class VideosRepository {

    async createVideo(user_id: string, thumbnail: string, title: string, description: string, publishedAt: string) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err: any, connection: any) => {

                if (err) {
                    reject(new Error("Erro ao conectar ao banco."));
                    return;
                }

                connection.query(
                    'INSERT INTO videos (video_id, user_id, thumbnail, title, description, publishedAt) VALUES (?,?,?,?,?,?)',
                    [uuidv4(), user_id, thumbnail, title, description, publishedAt],

                    (error: any, result: any, fields: any) => {
                        connection.release();

                        if (error) {
                            reject(new Error("Erro ao criar vídeo."));
                            return;
                        }

                        resolve({ message: "Vídeo criado com sucesso!" });
                    }
                );
            });
        });
    }

    async deleteVideo(video_id: string, user_id: string) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err: any, connection: any) => {

                if (err) {
                    reject(new Error("Erro ao conectar ao banco."));
                    return;
                }

                connection.query(
                    'DELETE FROM videos WHERE video_id = ? AND user_id = ?', [video_id, user_id],

                    (error: any, result: any, fields: any) => {
                        connection.release();

                        if (error) {
                            reject(new Error("Erro ao remover vídeo."));
                            return;
                        }

                        if (result.affectedRows === 0) {
                            reject(new Error("Vídeo não encontrado ou sem permissão."));
                            return;
                        }

                        resolve({ message: "Vídeo removido com sucesso!" });
                    }
                )
            });
        });
    }

    async getVideos(user_id: string) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err: any, connection: any) => {

                if (err) {
                    reject(new Error("Erro ao conectar ao banco."));
                    return;
                }

                connection.query(
                    'SELECT * FROM videos WHERE user_id = ?',
                    [user_id],

                    (error: any, results: any, filds: any) => {

                        connection.release();

                        if (error) {
                            reject(new Error("Erro ao buscar vídeos!"));
                            return;
                        }

                        resolve(results);
                    }
                );
            });
        });
    }

    searchVideos(request: Request, response: Response) {
        const { search } = request.query;

        pool.getConnection((err: any, connection: any) => {

            connection.query(

                'SELECT * FROM videos WHERE title LIKE ? OR description LIKE ?',
                [`%${search}%`, `%${search}%`],

                (error: any, results: any, filds: any) => {

                    connection.release();

                    if (error) {
                        return response.status(400).json({ error: "Erro ao buscar os vídeos." });
                    }

                    return response.status(200).json({ message: "Vídeos retornados com sucesso.", videos: results });
                }
            )
        })
    }
}