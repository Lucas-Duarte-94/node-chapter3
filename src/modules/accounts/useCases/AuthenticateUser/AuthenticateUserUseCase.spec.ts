import { AppError } from "@errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../CreateUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory
        );
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it("should be able to authenticate user", async () => {
        const user: ICreateUserDTO = {
            driver_license: "000123",
            email: "user@email.com",
            password: "123456",
            name: "Test User",
        };

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty("token");
    });

    it("should not be able to authenticate a non existing user", () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: "test@email.com",
                password: "123456",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to authenticate with incorrect password", () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                driver_license: "000123",
                email: "user@email.com",
                password: "123456",
                name: "Test User",
            };

            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: "user@email.com",
                password: "incorrectPassword",
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
