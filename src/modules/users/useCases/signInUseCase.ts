import UsersRepository from "../repositories/usersRepository"

const usersRepository = new UsersRepository();

export async function signInUseCase(
    email: string,
    password: string
) {
    const result = await usersRepository.signIn(email, password);

    return result;
}