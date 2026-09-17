import { Request, Response } from "express";
import { searchYoutubeVideos } from "../services/youtubeSearch";

export async function searchVideosController(
    request: Request,
    response: Response
) {
    const { search } = request.query;

    const videosResults = await searchYoutubeVideos(String(search));

    response.json(videosResults);
}