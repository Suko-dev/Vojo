import { container } from "tsyringe";

import { IUsersRepository } from "../../modules/user/repository/IUsersRepository";
import { UsersRepository } from "../../modules/user/repository/typeorm/UsersRepository";

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);
