import { Request, Response } from "express";
import UsersRepository from "../repositories/usersRepository";
const usersRepository = new UsersRepository();

export async function createUserController(
    request: Request,
    response: Response
) { const { name, surname, email, nickname, password } = request.body; }