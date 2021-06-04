import { container } from "tsyringe";

import { IArticlesRepository } from "../../modules/article/repository/IArticlesRepository";
import { ArticlesRepository } from "../../modules/article/repository/typeorm/articlesRepository";
import { ICommentsRepository } from "../../modules/comment/repository/IComentsRepository";
import { CommentsRepository } from "../../modules/comment/repository/typeorm/CommentsRepository";
import { IFavoritesRepository } from "../../modules/favorite/repository/IFavoritesRepository";
import { FavoritesRepository } from "../../modules/favorite/repository/typeorm/ProfilesRepository";
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

container.registerSingleton<IArticlesRepository>(
    "ArticlesRepository",
    ArticlesRepository
);
container.registerSingleton<ICommentsRepository>(
    "CommentsRepository",
    CommentsRepository
);
container.registerSingleton<IFavoritesRepository>(
    "FavoritesRepository",
    FavoritesRepository
);
