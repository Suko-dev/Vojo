import { inject, injectable } from "tsyringe";

import { IResponseUserDTO } from "../../dtos/IResponseUserDTO";
import { IUsersRepository } from "../../repository/IUsersRepository";

@injectable()
class GetUserUseCase {
    constructor(
        @inject("UsersRepository") private repository: IUsersRepository
    ) {}

    async execute(email: string, token: string): Promise<IResponseUserDTO> {
        const user = await this.repository.findByEmail(email);
        if (!token) {
            throw new Error("unnautorized");
        }

        Object.assign(user, { token });

        return user as IResponseUserDTO;
    }
}

export { GetUserUseCase };
