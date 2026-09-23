import { Router } from "express";
import { signInController } from "../modules/users/controllers/signInController";
import { createUserController } from "../modules/users/controllers/createUserController";

const usersRoutes = Router();

usersRoutes.post('/sign-up', createUserController);

usersRoutes.post('/sign-in', signInController);

export default usersRoutes;