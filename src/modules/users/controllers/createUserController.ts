import { Request, Response } from "express";
import UsersRepository from "../repositories/usersRepository";

const usersRepository = new UsersRepository();

export async function createUserController(
    request: Request,
    response: Response
) {
    const { name, surname, email, nickname, password } = request.body;

    try {

        const result = await usersRepository.createUser(
            name,
            surname,
            email,
            nickname,
            password
        );

        return response.status(200).json(result);

    } catch (error: any) {

        return response.status(400).json({ error: error.message });

    }
}