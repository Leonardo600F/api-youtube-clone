import UsersRepository from "../repositories/usersRepository";

const usersRepository = new UsersRepository();

export async function getUserUseCase(token: string) {
    const user = await usersRepository.getUser(token);

    return user;
}