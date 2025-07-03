import { Router } from "express";
import { signIn } from "../middleware/sign-in";
import UsersRepository from "../modules/users/repositories/usersRepository";

const usersRoutes = Router();
const usersRepository = new UsersRepository();

usersRoutes.post('/sign-up', (request, response) => {
    usersRepository.createUser(request, response);
});

usersRoutes.post('/sign-in', (request, response) => {
    usersRepository.signIn(request, response);
});

usersRoutes.get('/get-user', signIn, (request, response) => {
    usersRepository.getUser(request, response);
})

export default usersRoutes;