import { inject, injectable } from "tsyringe";

import { IResponseArticleDTO } from "../../../article/dtos/IResponseArticleDTO";
import { IArticlesRepository } from "../../../article/repository/IArticlesRepository";
import { IFavoritesRepository } from "../../repository/IFavoritesRepository";

@injectable()
class UnFavoriteProfileUseCase {
    constructor(
        @inject("FavoritesRepository")
        private favoritesRepository: IFavoritesRepository,
        @inject("ArticlesRepository")
        private articlesRepository: IArticlesRepository
    ) {}

    async execute(email: string, slug: string): Promise<IResponseArticleDTO> {
        await this.favoritesRepository.unFavorite(email, slug);

        const res = await this.articlesRepository.getArticleBySlug(slug);
        const fav = await this.favoritesRepository.countFavorites(slug);
        Object.assign(res, { favoritesCount: fav, favorited: false });
        return res;
    }
}

export { UnFavoriteProfileUseCase };
