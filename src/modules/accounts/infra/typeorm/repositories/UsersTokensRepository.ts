import { getRepository, Repository } from "typeorm";

import { ICreateUsersTokenDTO } from "@modules/accounts/dtos/ICreateUsersTokenDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";

import { UserToken } from "../entities/UserToken";

class UsersTokensRepository implements IUsersTokensRepository {
    private repository: Repository<UserToken>;
    constructor() {
        this.repository = getRepository(UserToken);
    }

    async deleteById(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async findByUserIdAndRefresh(
        user_id: string,
        refresh_token: string
    ): Promise<UserToken> {
        const userToken = await this.repository.findOne({
            where: {
                user_id,
                refresh_token,
            },
        });

        return userToken;
    }

    async create({
        expires_date,
        refresh_token,
        user_id,
    }: ICreateUsersTokenDTO): Promise<UserToken> {
        const userToken = this.repository.create({
            user_id,
            refresh_token,
            expires_date,
        });

        await this.repository.save(userToken);

        return userToken;
    }
}

export { UsersTokensRepository };
