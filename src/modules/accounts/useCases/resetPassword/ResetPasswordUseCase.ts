import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokenRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("UsersRepository")
        private userRepository: IUsersRepository
    ) {}
    async execute({ password, token }: IRequest): Promise<void> {
        const userToken = await this.usersTokenRepository.findByRefreshToken(
            token
        );

        if (!userToken) throw new AppError("Token Invalid");

        if (
            this.dateProvider.compareIfBefore(
                userToken.expires_date,
                this.dateProvider.dateNow()
            )
        ) {
            throw new AppError("Token expired");
        }

        const user = await this.userRepository.findById(userToken.user_id);

        user.password = await hash(password, 8);

        this.userRepository.create(user);

        await this.usersTokenRepository.deleteById(userToken.id);
    }
}

export { ResetPasswordUseCase };
