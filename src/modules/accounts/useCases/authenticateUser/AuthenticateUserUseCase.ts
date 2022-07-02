import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../repositories/IUsersRepository";

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
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository
    ) {}
    async execute({ email, password }: IRequest): Promise<IResponse> {
        // User exists
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error("Email or password incorrect");
        }
        // Password match
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("Email or password incorrect");
        }
        // Create Jsonwebtoken

        const token = sign({}, "tokenKey", {
            subject: user.id,
            expiresIn: "1d",
        });

        return {
            user: {
                email,
                name: user.name,
            },
            token,
        };
    }
}

export { AuthenticateUserUseCase };
