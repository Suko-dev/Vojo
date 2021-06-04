import { inject, injectable } from "tsyringe";

import { IResponseArticleDTO } from "../../../article/dtos/IResponseArticleDTO";
import { IArticlesRepository } from "../../../article/repository/IArticlesRepository";
import { IFavoritesRepository } from "../../repository/IFavoritesRepository";

@injectable()
class FavoriteProfileUseCase {
    constructor(
        @inject("FavoritesRepository")
        private favoritesRepository: IFavoritesRepository,
        @inject("ArticlesRepository")
        private articlesRepository: IArticlesRepository
    ) {}

    async execute(email: string, slug: string): Promise<IResponseArticleDTO> {
        const res = await this.articlesRepository.getArticleBySlug(slug);
        if (!res) {
            throw new Error("article not found");
        }
        const alreadyFavorit = await this.favoritesRepository.getFavorite(
            email,
            slug
        );
        if (alreadyFavorit) {
            throw new Error("already favorit");
        }
        await this.favoritesRepository.favorite(email, slug);
        const fav = await this.favoritesRepository.countFavorites(slug);
        Object.assign(res, { favoritesCount: fav, favorited: true });
        return res;
    }
}

export { FavoriteProfileUseCase };
