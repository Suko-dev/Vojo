import { inject, injectable } from "tsyringe";

import { IResponseCommentDTO } from "../../dtos/IResponseCommentDTO";
import { ICommentsRepository } from "../../repository/IComentsRepository";

@injectable()
class GetCommentUseCase {
    constructor(
        @inject("CommentsRepository")
        private commentsRepository: ICommentsRepository
    ) {}

    async execute(
        slug: string,
        email?: string
    ): Promise<IResponseCommentDTO[]> {
        const article = await this.commentsRepository.getComment(slug, email);
        return article;
    }
}

export { GetCommentUseCase };
