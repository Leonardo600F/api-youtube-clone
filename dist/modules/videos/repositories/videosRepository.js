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
    deleteVideo(request, response) {
        var _a;
        const { video_id } = request.params;
        const user_id = (_a = request.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!video_id) {
            return response.status(400).json({ error: "video_id é obrigatório." });
        }
        mysql_1.pool.getConnection((err, connection) => {
            connection.query('DELETE FROM videos WHERE video_id = ? AND user_id = ?', [video_id, user_id], (error, result, filds) => {
                connection.release();
                if (error) {
                    return response.status(400).json(error);
                }
                if (result.affectedRows === 0) {
                    return response.status(404).json({ error: "Vídeo não encontrado ou sem permissão." });
                }
                response.status(200).json({ message: "Vídeo removido com sucesso!" });
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
