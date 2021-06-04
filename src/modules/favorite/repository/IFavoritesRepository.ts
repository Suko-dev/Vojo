interface IFavoritesRepository {
    favorite(email: string, slug: string): Promise<boolean>;
    unFavorite(email: string, slug: string): Promise<boolean>;
    getFavorite(email: string, slug: string): Promise<boolean>;
    countFavorites(slug: string): Promise<number>;
}

export { IFavoritesRepository };
