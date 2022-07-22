import { ICreateUsersTokenDTO } from "@modules/accounts/dtos/ICreateUsersTokenDTO";
import { UserToken } from "@modules/accounts/infra/typeorm/entities/UserToken";

import { IUsersTokensRepository } from "../IUsersTokensRepository";

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
    usersTokens: UserToken[] = [];
    async create({
        expires_date,
        refresh_token,
        user_id,
    }: ICreateUsersTokenDTO): Promise<UserToken> {
        const userToken = new UserToken();

        Object.assign(userToken, {
            expires_date,
            refresh_token,
            user_id,
        });

        this.usersTokens.push(userToken);

        return userToken;
    }
    async findByUserIdAndRefresh(
        user_id: string,
        refresh_token: string
    ): Promise<UserToken> {
        return this.usersTokens.find(
            (userToken) =>
                userToken.user_id === user_id &&
                userToken.refresh_token === refresh_token
        );
    }
    async deleteById(id: string): Promise<void> {
        const index = this.usersTokens.findIndex(
            (userToken) => userToken.id === id
        );

        this.usersTokens.splice(index);
    }
    async findByRefreshToken(refresh_token: string): Promise<UserToken> {
        return this.usersTokens.find(
            (userToken) => userToken.refresh_token === refresh_token
        );
    }
}

export { UsersTokensRepositoryInMemory };
