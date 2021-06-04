import { inject, injectable } from "tsyringe";

import { ICreateArticleDTO } from "../../dtos/ICreateArticleDTO";
import { IResponseArticleDTO } from "../../dtos/IResponseArticleDTO";
import { IArticlesRepository } from "../../repository/IArticlesRepository";

@injectable()
class CreateArticleUseCase {
    constructor(
        @inject("ArticlesRepository")
        private articlesRepository: IArticlesRepository
    ) {}

    async execute({
        title,
        description,
        body,
        email,
        taglist,
    }: ICreateArticleDTO): Promise<IResponseArticleDTO> {
        const article = await this.articlesRepository.create(
            title,
            description,
            body,
            email,
            taglist
        );
        return article;
    }
}

export { CreateArticleUseCase };
