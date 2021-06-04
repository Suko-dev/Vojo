interface IGetArticleDTO {
    feed?: boolean;
    email?: string;
    pageLimit?: number;
    page?: number;
    tag?: string;
    favorited?: string;
    author?: string;
    limit?: number;
    offset?: number;
}
export { IGetArticleDTO };
