import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../../user/repository/IUsersRepository";
import { IArticlesRepository } from "../../repository/IArticlesRepository";

@injectable()
class DeleteArticleUseCase {
    constructor(
        @inject("ArticlesRepository")
        private articleRepository: IArticlesRepository,
        @inject("UsersRepository") private usersRepository: IUsersRepository
    ) {}

    async execute(slug: string, email: string): Promise<void> {
        const isAUthor = await this.articleRepository.isAuthor(slug, email);
        if (!isAUthor) {
            throw new Error("not the article author");
        }
        await this.articleRepository.delete(slug);
    }
}

export { DeleteArticleUseCase };
