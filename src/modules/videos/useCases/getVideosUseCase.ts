import VideosRepository from "../repositories/videosRepository";

const videosRepository = new VideosRepository();

export async function getVideosUseCase(user_id: string) {
    const videos = await videosRepository.getVideos(user_id);

    return videos;
}