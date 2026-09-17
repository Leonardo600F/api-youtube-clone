import { Request, Response } from "express";
import { getYoutubeVideos } from "../services/youtubeService";

export async function getVideosController(
    request: Request,
    response: Response
) {
    const { categoryId } = request.query;

    const videos = await getYoutubeVideos(String(categoryId));

    response.json(videos);
}