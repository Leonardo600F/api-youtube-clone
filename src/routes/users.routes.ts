import { Router } from "express";
import UsersRepository from "../modules/users/repositories/usersRepository";
import { signInController } from "../modules/users/controllers/signInController";
import { createUserController } from "../modules/users/controllers/createUserController";

const usersRoutes = Router();
const usersRepository = new UsersRepository();

usersRoutes.post('/sign-up', createUserController);

usersRoutes.post('/sign-in', signInController);

export default usersRoutes;