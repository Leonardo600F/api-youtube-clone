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
const express_1 = require("express");
const youtubeService_1 = require("../modules/youtube/services/youtubeService");
const apiRoutes = (0, express_1.Router)();
apiRoutes.get('/videos', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = request.query;
    const videos = yield (0, youtubeService_1.getYoutubeVideos)(String(categoryId));
    response.json(videos);
}));
exports.default = apiRoutes;
