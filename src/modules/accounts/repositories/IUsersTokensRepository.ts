import { ICreateUsersTokenDTO } from "../dtos/ICreateUsersTokenDTO";
import { UserToken } from "../infra/typeorm/entities/UserToken";

interface IUsersTokensRepository {
    create({
        expires_date,
        refresh_token,
        user_id,
    }: ICreateUsersTokenDTO): Promise<UserToken>;
}

export { IUsersTokensRepository };
