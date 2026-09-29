import { Router } from "express";
import { createVideoController } from "../modules/videos/controllers/createVideoController";
import { deleteVideoController } from "../modules/videos/controllers/deleteVideoController";
import { getVideosController } from "../modules/videos/controllers/getVideosController";
import { searchVideosController } from "../modules/videos/controllers/searchVideosController";
import { signIn } from "../middleware/sign-in";

const videosRoutes = Router();

videosRoutes.post('/create-video', signIn, createVideoController);

videosRoutes.delete('/delete-video/:video_id', signIn, deleteVideoController);

videosRoutes.get('get-videos', signIn, getVideosController);

videosRoutes.get('/search', searchVideosController);

export default videosRoutes;