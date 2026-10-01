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
class VideosRepository {
    createVideo(user_id, thumbnail, title, description, publishedAt) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                mysql_1.pool.getConnection((err, connection) => {
                    if (err) {
                        reject(new Error("Erro ao conectar ao banco."));
                        return;
                    }
                    connection.query('INSERT INTO videos (video_id, user_id, thumbnail, title, description, publishedAt) VALUES (?,?,?,?,?,?)', [(0, uuid_1.v4)(), user_id, thumbnail, title, description, publishedAt], (error, result, fields) => {
                        connection.release();
                        if (error) {
                            reject(new Error("Erro ao criar vídeo."));
                            return;
                        }
                        resolve({ message: "Vídeo criado com sucesso!" });
                    });
                });
            });
        });
    }
    deleteVideo(video_id, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                mysql_1.pool.getConnection((err, connection) => {
                    if (err) {
                        reject(new Error("Erro ao conectar ao banco."));
                        return;
                    }
                    connection.query('DELETE FROM videos WHERE video_id = ? AND user_id = ?', [video_id, user_id], (error, result, fields) => {
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
                    });
                });
            });
        });
    }
    getVideos(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                mysql_1.pool.getConnection((err, connection) => {
                    if (err) {
                        reject(new Error("Erro ao conectar ao banco."));
                        return;
                    }
                    connection.query('SELECT * FROM videos WHERE user_id = ?', [user_id], (error, results, filds) => {
                        connection.release();
                        if (error) {
                            reject(new Error("Erro ao buscar vídeos!"));
                            return;
                        }
                        resolve(results);
                    });
                });
            });
        });
    }
    searchVideos(search) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                mysql_1.pool.getConnection((err, connection) => {
                    if (err) {
                        reject(new Error("Erro ao conectar ao banco."));
                        return;
                    }
                    connection.query('SELECT * FROM videos WHERE title LIKE ? OR description LIKE ?', [`%${search}%`, `%${search}%`], (error, results, filds) => {
                        connection.release();
                        if (error) {
                            reject(new Error("Erro ao buscar vídeos!"));
                            return;
                        }
                        resolve(results);
                    });
                });
            });
        });
    }
}
exports.default = VideosRepository;
