import { Request, Response } from "express";
import UsersRepository from "../repositories/usersRepository";

const usersRepository = new UsersRepository();

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
        const user = await usersRepository.getUser(token);

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