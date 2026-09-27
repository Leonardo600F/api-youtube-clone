import VideosRepository from "../repositories/videosRepository";

const videosRepository = new VideosRepository();

export async function createVideoUseCase(
    user_id: string,
    thumbnail: string,
    title: string,
    description: string,
    publishedAt: string
) {
    const result = await videosRepository.createVideo(user_id, thumbnail, title, description, publishedAt)
}