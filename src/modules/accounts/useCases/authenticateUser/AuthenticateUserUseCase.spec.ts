import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory
        );
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it("Should be able to authenticate an user", async () => {
        const user: ICreateUserDTO = {
            driver_license: "000000",
            email: "test@auth.com",
            name: "Auth test",
            password: "auth",
        };

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty("token");
    });

    it("Should not be able to authenticate with incorrect password", async () => {
        const user: ICreateUserDTO = {
            driver_license: "000000",
            email: "test@auth.com",
            name: "Auth test",
            password: "auth",
        };

        await createUserUseCase.execute(user);

        await expect(
            authenticateUserUseCase.execute({
                email: user.email,
                password: "incorrectPassword",
            })
        ).rejects.toEqual(new AppError("Email or password incorrect"));
    });

    it("Shoul not be able to authenticate an nonexistent user", async () => {
        await expect(
            authenticateUserUseCase.execute({
                email: "false@auth.com",
                password: "incorrectPassword",
            })
        ).rejects.toEqual(new AppError("Email or password incorrect"));
    });
});
