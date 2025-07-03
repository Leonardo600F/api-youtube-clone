"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("../../../mysql");
const uuid_1 = require("uuid");
class VideosRepository {
    createVideo(request, response) {
        const { user_id, thumbnail, title, description, publishedAt } = request.body;
        mysql_1.pool.getConnection((err, connection) => {
            connection.query('INSERT INTO videos (video_id, user_id, thumbnail, title, description, publishedAt) VALUES (?,?,?,?,?,?)', [(0, uuid_1.v4)(), user_id, thumbnail, title, description, publishedAt], (error, result, filds) => {
                connection.release();
                if (error) {
                    return response.status(400).json(error);
                }
                response.status(200).json({ message: "Vídeo criado com sucesso!" });
                ;
            });
        });
    }
    getVideos(request, response) {
        const { user_id } = request.query;
        mysql_1.pool.getConnection((err, connection) => {
            connection.query('SELECT * FROM videos WHERE user_id = ?', [user_id], (error, results, filds) => {
                connection.release();
                if (error) {
                    return response.status(400).json({ error: "Erro ao buscar os vídeos." });
                }
                return response.status(200).json({ message: "Vídeos retornados com sucesso.", videos: results });
            });
        });
    }
    searchVideos(request, response) {
        const { search } = request.query;
        mysql_1.pool.getConnection((err, connection) => {
            connection.query('SELECT * FROM videos WHERE title LIKE ? OR description LIKE ?', [`%${search}%`, `%${search}%`], (error, results, filds) => {
                connection.release();
                if (error) {
                    return response.status(400).json({ error: "Erro ao buscar os vídeos." });
                }
                return response.status(200).json({ message: "Vídeos retornados com sucesso.", videos: results });
            });
        });
    }
}
exports.default = VideosRepository;
