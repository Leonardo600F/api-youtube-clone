import { Request, Response } from "express";
import { getVideosUseCase } from "../useCases/getVideosUseCase";

export async function getVideosController(
    request: Request,
    response: Response
) {
    const { categoryId } = request.query;

    const videos = await getVideosUseCase(String(categoryId));

    response.json(videos);
}