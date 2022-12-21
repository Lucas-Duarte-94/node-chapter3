import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UserTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderRepositoryInMemory } from "@shared/container/providers/MailProvider/implementations/MailProviderRepositoryInMemory";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let dateProvider: DayjsDateProvider;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let userTokensRepositoryInMemory: UserTokensRepositoryInMemory;
let mailProvider: MailProviderRepositoryInMemory;

describe("Send forgot password e-mail", () => {
    beforeEach(() => {
        dateProvider = new DayjsDateProvider();
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        mailProvider = new MailProviderRepositoryInMemory();
        userTokensRepositoryInMemory = new UserTokensRepositoryInMemory();
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            userTokensRepositoryInMemory,
            dateProvider,
            mailProvider
        );
    });

    it("should be able to send a forgot password mail user", async () => {
        const sendMail = spyOn(mailProvider, "sendMail");

        await usersRepositoryInMemory.create({
            driver_license: "9867678",
            email: "test@mail.com",
            name: "test_user",
            password: "pass",
        });

        await sendForgotPasswordMailUseCase.execute("test@mail.com");

        expect(sendMail).toHaveBeenCalled();
    });

    it("should not be able to send email if user does not exists", async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute("unregistered@mail.com")
        ).rejects.toEqual("User does not exists!");
    });

    it("should be able to create an users token", async () => {
        const generateToken = spyOn(userTokensRepositoryInMemory, "create");

        await usersRepositoryInMemory.create({
            driver_license: "9867678",
            email: "test@mail.com",
            name: "test_user",
            password: "pass",
        });

        await sendForgotPasswordMailUseCase.execute("test@mail.com");

        expect(generateToken).toHaveBeenCalled();
    });
});
