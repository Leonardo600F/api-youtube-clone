import { Request, Response } from "express";
import { signInUseCase } from "../useCases/signInUseCase";

export async function signInController(
    request: Request,
    response: Response
) {
    const { email, password } = request.body;

    try {
        const result = await signInUseCase(email, password);

        return response.status(200).json(result);

    } catch (error: any) { return response.status(400).json({ error: error.message }); }
}