import { hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "../../../../config/auth";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IResponseUserDTO } from "../../dtos/IResponseUserDTO";
import { IUsersRepository } from "../../repository/IUsersRepository";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository") private usersRepository: IUsersRepository
    ) {}

    async execute({
        username,
        email,
        password,
    }: ICreateUserDTO): Promise<IResponseUserDTO> {
        const userExist = await this.usersRepository.findByEmail(email);
        if (userExist) {
            throw new Error("user alredy exists");
        }
        const hashpassword = await hash(password, 8);
        const user = await this.usersRepository.create({
            username,
            email,
            password: hashpassword,
        });
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

export { CreateUserUseCase };
