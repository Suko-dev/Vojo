import { container } from "tsyringe";

import { IProfilesRepository } from "../../modules/profile/repository/IProfilesRepository";
import { ProfilesRepository } from "../../modules/profile/repository/typeorm/ProfilesRepository";
import { IUsersRepository } from "../../modules/user/repository/IUsersRepository";
import { UsersRepository } from "../../modules/user/repository/typeorm/UsersRepository";

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);

container.registerSingleton<IProfilesRepository>(
    "ProfilesRepository",
    ProfilesRepository
);
