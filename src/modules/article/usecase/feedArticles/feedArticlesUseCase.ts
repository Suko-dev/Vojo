import { inject, injectable } from "tsyringe";

import { IGetArticleDTO } from "../../dtos/IGetArticleDTO";
import { IResponseArticleDTO } from "../../dtos/IResponseArticleDTO";
import { IArticlesRepository } from "../../repository/IArticlesRepository";

@injectable()
class FeedArticlesUseCase {
    constructor(
        @inject("ArticlesRepository")
        private articlesRepository: IArticlesRepository
    ) {}

    async execute({
        feed,
        email,
        pageLimit,
        page,
    }: IGetArticleDTO): Promise<IResponseArticleDTO[]> {
        const article = await this.articlesRepository.getArticle(
            feed,
            email,
            pageLimit,
            page
        );
        return article;
    }
}

export { FeedArticlesUseCase };
