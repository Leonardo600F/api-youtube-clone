import { Request, Response } from "express";
import { getVideosUseCase } from "../useCases/getVideosUseCase";

export async function getVideosController(request: Request, response: Response) {
    const user_id = request.user?.id;

    if (!user_id) { return response.status(400).json({ error: "user_id é obrigatório." }); }

    try {
        const videos = await getVideosUseCase(user_id);

        return response.status(200).json({ message: "Vídeos retornados com sucesso.", videos });

    } catch (error: any) {
        return response.status(400).json({ error: error.message });
    }
}