"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const videosRepository_1 = __importDefault(require("../modules/videos/repositories/videosRepository"));
const sign_in_1 = require("../middleware/sign-in");
const videoRoutes = (0, express_1.Router)();
const videosRepository = new videosRepository_1.default();
videoRoutes.post('/create-video', sign_in_1.signIn, (request, response) => {
    videosRepository.createVideo(request, response);
});
videoRoutes.delete('/delete-video/:video_id', sign_in_1.signIn, (request, response) => {
    videosRepository.deleteVideo(request, response);
});
videoRoutes.get('/get-videos', sign_in_1.signIn, (request, response) => {
    videosRepository.getVideos(request, response);
});
videoRoutes.get('/search', (request, response) => {
    videosRepository.searchVideos(request, response);
});
exports.default = videoRoutes;
