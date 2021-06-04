import { inject, injectable } from "tsyringe";

import { IResponseArticleDTO } from "../../dtos/IResponseArticleDTO";
import { IUpdateArticleDTO } from "../../dtos/IUpdateArticleDTO";
import { IArticlesRepository } from "../../repository/IArticlesRepository";

@injectable()
class UpdateArticleUseCase {
    constructor(
        @inject("ArticlesRepository")
        private articlesRepository: IArticlesRepository
    ) {}

    async execute({
        title,
        description,
        body,
        slug,
    }: IUpdateArticleDTO): Promise<IResponseArticleDTO | undefined> {
        const article = await this.articlesRepository.update({
            title,
            description,
            body,
            slug,
        });
        return article;
    }
}

export { UpdateArticleUseCase };
