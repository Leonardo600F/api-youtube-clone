import { Request, Response } from "express";
import { deleteVideoUseCase } from "../useCases/deleteVideoUseCase";

export async function deleteVideoController(request: Request, response: Response) {
    const { video_id } = request.params;
    const user_id = request.user?.id;

    if (!video_id) {
        return response.status(400).json({ error: "video_id é obrigatório." });
    }

    if (!user_id) {
        return response.status(401).json({ error: "Usuário não encontrado." });
    }

    try {
        const result = await deleteVideoUseCase(video_id, user_id);

        return response.status(200).json(result);
    } catch (error: any) { return response.status(400).json({ error: error.message }); }
}