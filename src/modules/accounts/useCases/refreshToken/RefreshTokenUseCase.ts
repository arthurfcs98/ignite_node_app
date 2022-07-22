import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { auth } from "@config/auth";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
    sub: string;
    email: string;
}

interface ITokenResponse {
    token: string;
    refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {}

    async execute(token: string): Promise<ITokenResponse> {
        const {
            expires_in_token,
            secret_refresh,
            expires_in_refresh_token,
            expires_refresh_token_days,
            secret_token,
        } = auth;

        const { sub: user_id, email } = verify(
            token,
            secret_refresh
        ) as IPayload;

        const userToken =
            await this.usersTokensRepository.findByUserIdAndRefresh(
                user_id,
                token
            );

        if (!userToken) throw new AppError("Refresh token does not exists");

        await this.usersTokensRepository.deleteById(userToken.id);

        const newToken = sign({ email }, secret_token, {
            subject: user_id,
            expiresIn: expires_in_token,
        });

        const refresh_token = sign({}, secret_refresh, {
            subject: user_id,
            expiresIn: expires_in_refresh_token,
        });
        await this.usersTokensRepository.create({
            user_id,
            refresh_token,
            expires_date: this.dateProvider.addDays(expires_refresh_token_days),
        });

        return {
            token: newToken,
            refresh_token,
        };
    }
}

export { RefreshTokenUseCase };
