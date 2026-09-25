import { Request, Response } from "express";
import { SearchVideosUseCase } from "../useCases/searchVideosUseCase";

export async function searchVideosController(
    request: Request,
    response: Response
) {
    const { search } = request.query;

    const videosResults = await SearchVideosUseCase(String(search));

    response.json(videosResults);
}