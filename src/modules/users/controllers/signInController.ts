import { Request, Response } from "express";
import UsersRepository from "../repositories/usersRepository";

const usersRepository = new UsersRepository();

export async function signInController(
    request: Request,
    response: Response
) {
    const { email, password } = request.body;

    try {
        const result = await usersRepository.signIn(email, password);

        return response.status(200).json(result);

    } catch (error: any) { return response.status(400).json({ error: error.message }); }
}