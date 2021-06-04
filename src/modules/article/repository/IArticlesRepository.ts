import { IResponseArticleDTO } from "../dtos/IResponseArticleDTO";
import { IUpdateArticleDTO } from "../dtos/IUpdateArticleDTO";

interface IArticlesRepository {
    getArticle(
        feed?: boolean,
        email?: string,
        pageLimit?: number,
        page?: number,
        tag?: string,
        author?: string,
        favorited?: string
    ): Promise<IResponseArticleDTO[]>;
    getArticleBySlug(
        slug: string,
        email?: string
    ): Promise<IResponseArticleDTO>;
    create(
        title: string,
        description: string,
        body: string,
        email: string,
        tag?: string[]
    ): Promise<IResponseArticleDTO>;
    isAuthor(slug: string, email: string): Promise<boolean>;
    update(data: IUpdateArticleDTO): Promise<IResponseArticleDTO | undefined>;
    delete(slug: string): Promise<void>;
}

export { IArticlesRepository };
