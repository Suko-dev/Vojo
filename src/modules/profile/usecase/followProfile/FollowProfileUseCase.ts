import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../../user/repository/IUsersRepository";
import { IResponseProfileDTO } from "../../dtos/IResponseProfileDTO";
import { IProfilesRepository } from "../../repository/IProfilesRepository";

@injectable()
class FollowProfileUseCase {
    constructor(
        @inject("UsersRepository") private usersRepository: IUsersRepository,
        @inject("ProfilesRepository")
        private likesRepository: IProfilesRepository
    ) {}

    async execute(
        username: string,
        email: string
    ): Promise<IResponseProfileDTO> {
        const getFollowing = await this.likesRepository.follow(email, username);

        const user = await this.usersRepository.findByUsername(username);
        const res = {
            username: user?.username,
            bio: user?.bio,
            image: user?.image,
            following: getFollowing,
        } as IResponseProfileDTO;
        return res;
    }
}

export { FollowProfileUseCase };
