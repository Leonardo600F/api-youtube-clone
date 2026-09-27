import { Request, Response } from "express";
import { createVideoUseCase } from "../useCases/createVideoUseCase";

export async function createVideoController(request: Request, response: Response) {
    const { user_id, thumbnail, title, description, publishedAt } = request.body;

    try {
        const result = await createVideoUseCase(user_id, thumbnail, title, description, publishedAt);

        return response.status(200).json(result);

    } catch (error: any) {
        return response.status(400).json({ error: error.message });
    }
}