import { Request, Response } from "express";
import { createUserUseCase } from "../useCases/createUserUseCase";

export async function createUserController(
    request: Request,
    response: Response
) {
    const { name, surname, email, nickname, password } = request.body;

    try {

        const result = await createUserUseCase(name, surname, email, nickname, password);

        return response.status(200).json(result);

    } catch (error: any) {

        return response.status(400).json({ error: error.message });

    }
}