import { pool } from "../../../mysql";
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from "express";

export default class VideosRepository {

    createVideo(request: Request, response: Response) {

        const { user_id, thumbnail, title, description, publishedAt } = request.body;

        pool.getConnection((err: any, connection: any) => {
            connection.query(
                'INSERT INTO videos (video_id, user_id, thumbnail, title, description, publishedAt) VALUES (?,?,?,?,?,?)',

                [uuidv4(), user_id, thumbnail, title, description, publishedAt],

                (error: any, result: any, filds: any) => {
                    connection.release();

                    if (error) {
                        return response.status(400).json(error);
                    }

                    response.status(200).json({ message: "Vídeo criado com sucesso!" });;
                }
            )
        })
    }

    deleteVideo(request: Request, response: Response) {
        const { video_id } = request.params;
        const user_id = request.user?.id;

        if (!video_id) {
            return response.status(400).json({ error: "video_id é obrigatório." });
        }

        pool.getConnection((err: any, connection: any) => {
            connection.query(
                'DELETE FROM videos WHERE video_id = ? AND user_id = ?',
                [video_id, user_id],

                (error: any, result: any, filds: any) => {
                    connection.release();

                    if (error) {
                        return response.status(400).json(error);
                    }

                    if (result.affectedRows === 0) {
                        return response.status(404).json({ error: "Vídeo não encontrado ou sem permissão." });
                    }

                    response.status(200).json({ message: "Vídeo removido com sucesso!" });
                }
            )
        })
    }

    getVideos(request: Request, response: Response) {
        const { user_id } = request.query;

        pool.getConnection((err: any, connection: any) => {
            connection.query(
                'SELECT * FROM videos WHERE user_id = ?',
                [user_id],

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