import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordEmailUseCase } from "./SendForgotPasswordEmailUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokenRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: IDateProvider;
let mailProvider: IMailProvider;

let sendForgotPasswordEmailUseCase: SendForgotPasswordEmailUseCase;

describe("Send forgot Mail", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        usersTokenRepositoryInMemory = new UsersTokensRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        mailProvider = new MailProviderInMemory();

        sendForgotPasswordEmailUseCase = new SendForgotPasswordEmailUseCase(
            usersRepositoryInMemory,
            usersTokenRepositoryInMemory,
            dateProvider,
            mailProvider
        );
    });

    it("Should be able to sent a forgot password email to user", async () => {
        const sendMail = jest.spyOn(mailProvider, "sendMail");

        await usersRepositoryInMemory.create({
            driver_license: "811866",
            email: "itoefe@linwaj.gf",
            name: "Earl Hall",
            password: "1234",
        });

        await sendForgotPasswordEmailUseCase.execute("itoefe@linwaj.gf");

        expect(sendMail).toHaveBeenCalled();
    });
    it("Should not be able to sent a forgot password email to nonexistent user", async () => {
        await expect(
            sendForgotPasswordEmailUseCase.execute("pasvehbu@muhtoki.gs")
        ).rejects.toEqual(new AppError("User does not exists"));
    });

    it("Shoul be able to create a new users token", async () => {
        const generateToken = jest.spyOn(
            usersTokenRepositoryInMemory,
            "create"
        );
        await usersRepositoryInMemory.create({
            driver_license: "811866",
            email: "itoefe@linwaj.gf",
            name: "Earl Hall",
            password: "1234",
        });
        await sendForgotPasswordEmailUseCase.execute("itoefe@linwaj.gf");

        expect(generateToken).toBeCalled();
    });
});
