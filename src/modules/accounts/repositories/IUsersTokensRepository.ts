import { ICreateUsersTokenDTO } from "../dtos/ICreateUsersTokenDTO";
import { UserToken } from "../infra/typeorm/entities/UserToken";

interface IUsersTokensRepository {
    create({
        expires_date,
        refresh_token,
        user_id,
    }: ICreateUsersTokenDTO): Promise<UserToken>;

    findByUserIdAndRefresh(
        user_id: string,
        refresh_token: string
    ): Promise<UserToken>;

    deleteById(id: string): Promise<void>;
    findByRefreshToken(refresh_token: string): Promise<UserToken>;
}

export { IUsersTokensRepository };
