import { Request, Response } from "express";
import { searchVideosUseCase } from "../useCases/searchVideosUseCase";

export async function searchVideosController(request: Request, response: Response) {
    const { search } = request.query;

    if (!search) {
        return response.status(400).json({ error: "Termo de busca é obrigatório." });
    }

    try {
        const videos = await searchVideosUseCase(String(search));

        return response.status(200).json({ message: "Vídeos retornados com sucesso.", videos });

    } catch (error: any) { return response.status(400).json({ error: error.message }); }
}