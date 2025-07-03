import { Router } from 'express';
import VideosRepository from '../modules/videos/repositories/videosRepository';
import { signIn } from '../middleware/sign-in';

const videoRoutes = Router();
const videosRepository = new VideosRepository();

videoRoutes.post('/create-video', signIn, (request, response) => {
    videosRepository.createVideo(request, response);
})

videoRoutes.get('/get-videos', signIn, (request, response) => {
    videosRepository.getVideos(request, response);
})

videoRoutes.get('/search', (request, response) => {
    videosRepository.searchVideos(request, response)
})

export default videoRoutes;