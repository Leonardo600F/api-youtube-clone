import { Router } from "express";
import { signInController } from "../modules/users/controllers/signInController";
import { createUserController } from "../modules/users/controllers/createUserController";
import { getUsersController } from "../modules/users/controllers/getUsersController";
import { signIn } from "../middleware/sign-in";

const usersRoutes = Router();

usersRoutes.post('/sign-up', createUserController);

usersRoutes.post('/sign-in', signInController);

usersRoutes.get('/get-user', signIn, getUsersController);

export default usersRoutes;