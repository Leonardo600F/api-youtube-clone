import VideosRepository from "../repositories/videosRepository";

const videosRepository = new VideosRepository();

export async function deleteVideoUseCase(video_id: string, user_id: string) {
    const result = await videosRepository.deleteVideo(video_id, user_id);

    return result;
}