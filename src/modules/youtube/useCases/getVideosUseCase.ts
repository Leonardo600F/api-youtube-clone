import { getYoutubeVideos } from "../services/youtubeService";

export async function getVideosUseCase(categoryId: string) {
    const videos = await getYoutubeVideos(categoryId);

    return videos;
}