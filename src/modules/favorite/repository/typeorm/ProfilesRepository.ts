import { getRepository, Repository } from "typeorm";

import { Favorite } from "../../entity/Favorite";
import { IFavoritesRepository } from "../IFavoritesRepository";

class FavoritesRepository implements IFavoritesRepository {
    private favoriteRepository: Repository<Favorite>;
    constructor() {
        this.favoriteRepository = getRepository(Favorite);
    }
    async favorite(email: string, slug: string): Promise<boolean> {
        const favorite = this.favoriteRepository.create({ email, slug });
        await this.favoriteRepository.save(favorite);
        return true;
    }
    async unFavorite(email: string, slug: string): Promise<boolean> {
        await this.favoriteRepository.delete({ email, slug });
        return false;
    }
    async getFavorite(email: string, slug: string): Promise<boolean> {
        const favorite = await this.favoriteRepository.findOne({ slug, email });
        if (favorite) {
            return true;
        }
        return false;
    }
    async countFavorites(slug: string): Promise<number> {
        const count = await this.favoriteRepository.count({ slug });
        return count;
    }
}

export { FavoritesRepository };
