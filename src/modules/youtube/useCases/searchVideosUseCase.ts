import { searchYoutubeVideos } from "../services/youtubeSearch";

export async function SearchVideosUseCase(search: string) {
    const videos = await searchYoutubeVideos(search);

    return videos;
}