import { inject, injectable } from "tsyringe";

import { IResponseArticleDTO } from "../../dtos/IResponseArticleDTO";
import { IArticlesRepository } from "../../repository/IArticlesRepository";

@injectable()
class GetArticleUseCase {
    constructor(
        @inject("ArticlesRepository")
        private articlesRepository: IArticlesRepository
    ) {}

    async execute(slug: string, email?: string): Promise<IResponseArticleDTO> {
        const article = await this.articlesRepository.getArticleBySlug(
            slug,
            email
        );
        return article;
    }
}

export { GetArticleUseCase };
