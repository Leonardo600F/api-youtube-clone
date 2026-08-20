import { Router } from "express";
import { getYoutubeVideos } from "../modules/youtube/services/youtubeService";

const apiRoutes = Router();

apiRoutes.get('/videos', async (request, response) => {

    const { categoryId } = request.query;

    const videos = await getYoutubeVideos(String(categoryId));

    response.json(videos);
});

export default apiRoutes;