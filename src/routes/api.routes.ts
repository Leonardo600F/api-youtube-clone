import { Router } from "express";
import { getVideosController } from "../modules/youtube/controllers/getVideosControllers";
import { searchVideosController } from "../modules/youtube/controllers/searchVideosController";

const apiRoutes = Router();

apiRoutes.get('/videos', getVideosController);

apiRoutes.get('/search', searchVideosController);

export default apiRoutes;