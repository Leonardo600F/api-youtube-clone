import VideosRepository from "../repositories/videosRepository";

const videosRepository = new VideosRepository();

export async function searchVideosUseCase(search: string) {
    const videos = await videosRepository.searchVideos(search);

    return videos;
}