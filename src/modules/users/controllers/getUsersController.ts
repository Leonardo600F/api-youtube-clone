import { Request, Response } from "express";
import { getUserUseCase } from "../useCases/getUserUseCase";

export async function getUsersController(
    request: Request,
    response: Response
) {
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
        return response.status(401).json({
            error: "Token não fornecido."
        });
    }

    try {
        const user = await getUserUseCase(token);

        if (!user) {
            return response.status(404).json({
                error: "Usuário não encontrado."
            });
        }

        return response.status(200).json(user);

    } catch (error: any) {
        return response.status(401).json({
            error: error.message
        });
    }
}