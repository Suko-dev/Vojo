import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { IUpdateUserDTO } from "../../dtos/IUpdateUserDTO";
import { User } from "../../entity/User";
import { IUsersRepository } from "../../repository/IUsersRepository";

@injectable()
class UpdateUserUseCase {
    constructor(
        @inject("UsersRepository") private usersRepository: IUsersRepository
    ) {}

    async execute({
        username,
        email,
        password,
        image,
        bio,
        newemail,
    }: IUpdateUserDTO): Promise<User> {
        let hashpassword;
        if (password) {
            hashpassword = await hash(password, 8);
        }
        const user = await this.usersRepository.update({
            username,
            email,
            password: hashpassword,
            image,
            bio,
            newemail,
        });
        return user;
    }
}

export { UpdateUserUseCase };
