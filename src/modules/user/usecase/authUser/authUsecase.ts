import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "../../../../config/auth";
import { IAuthUserDTO } from "../../dtos/IAuthUserDTO";
import { IResponseUserDTO } from "../../dtos/IResponseUserDTO";
import { IUsersRepository } from "../../repository/IUsersRepository";

@injectable()
class AuthUserUseCase {
    constructor(
        @inject("UsersRepository") private userRepository: IUsersRepository
    ) {}
    async execute({
        email,
        password,
    }: IAuthUserDTO): Promise<IResponseUserDTO> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new Error("Email or password incorrect");
        }

        const correctPassword = await compare(password, user.password);
        if (!correctPassword) {
            throw new Error("Email or password incorrect");
        }

        const token = sign({}, auth.secret_token, {
            subject: user.email,
            expiresIn: auth.token_expiration,
        });
        const res: IResponseUserDTO = {
            email: user.email,
            token,
            username: user.username,
            bio: user.bio,
            image: user.image,
        };
        return res;
    }
}

export { AuthUserUseCase };
