import UsersRepository from "../repositories/usersRepository";

const usersRepository = new UsersRepository();

export async function createUserUseCase(
    name: string,
    surname: string,
    email: string,
    nickname: string,
    password: string
) {
    const result = await usersRepository.createUser(name, surname, email, nickname, password);

    return result;
}