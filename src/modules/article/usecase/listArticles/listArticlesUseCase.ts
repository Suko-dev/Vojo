import { inject, injectable } from "tsyringe";

import { IGetArticleDTO } from "../../dtos/IGetArticleDTO";
import { IResponseArticleDTO } from "../../dtos/IResponseArticleDTO";
import { IArticlesRepository } from "../../repository/IArticlesRepository";

@injectable()
class ListArticlesUseCase {
    constructor(
        @inject("ArticlesRepository")
        private articlesRepository: IArticlesRepository
    ) {}

    async execute({
        tag,
        feed,
        author,
        favorited,
        pageLimit,
        page,
        email,
    }: IGetArticleDTO): Promise<IResponseArticleDTO[]> {
        const article = await this.articlesRepository.getArticle(
            feed,
            email,
            pageLimit,
            page,
            tag,
            author,
            favorited
        );
        return article;
    }
}

export { ListArticlesUseCase };
