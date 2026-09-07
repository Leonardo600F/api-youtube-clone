import { Router } from "express";
import { getYoutubeVideos } from "../modules/youtube/services/youtubeService";
import { searchYoutubeVideos } from "../modules/youtube/services/youtubeSearch";

const apiRoutes = Router();

apiRoutes.get('/videos', async (request, response) => {

    const { categoryId } = request.query;

    const videos = await getYoutubeVideos(String(categoryId));

    response.json(videos);
});

apiRoutes.get('/search', async (request, response) => {
    const { search } = request.query;

    const videosResults = await searchYoutubeVideos(String(search));

    response.json(videosResults);
});

export default apiRoutes;