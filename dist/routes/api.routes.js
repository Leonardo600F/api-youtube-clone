"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getVideosControllers_1 = require("../modules/youtube/controllers/getVideosControllers");
const searchVideosController_1 = require("../modules/youtube/controllers/searchVideosController");
const apiRoutes = (0, express_1.Router)();
apiRoutes.get('/videos', getVideosControllers_1.getVideosController);
apiRoutes.get('/search', searchVideosController_1.searchVideosController);
exports.default = apiRoutes;
