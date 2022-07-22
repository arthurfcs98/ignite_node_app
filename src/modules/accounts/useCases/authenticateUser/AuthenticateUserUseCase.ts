import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { auth } from "@config/auth";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    email: string;
    password: string;
}
interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
    refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository,
        @inject("UsersTokenRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {}
    async execute({ email, password }: IRequest): Promise<IResponse> {
        // User exists
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new AppError("Email or password incorrect");
        }
        // Password match
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError("Email or password incorrect");
        }
        // Create Jsonwebtoken

        const {
            expires_in_token,
            secret_token,
            secret_refresh,
            expires_in_refresh_token,
            expires_refresh_token_days,
        } = auth;

        const token = sign({ email }, secret_token, {
            subject: user.id,
            expiresIn: expires_in_token,
        });

        const refresh_token = sign({}, secret_refresh, {
            subject: user.id,
            expiresIn: expires_in_refresh_token,
        });

        await this.usersTokensRepository.create({
            user_id: user.id,
            refresh_token,
            expires_date: this.dateProvider.addDays(expires_refresh_token_days),
        });

        return {
            user: {
                email,
                name: user.name,
            },
            token,
            refresh_token,
        };
    }
}

export { AuthenticateUserUseCase };
