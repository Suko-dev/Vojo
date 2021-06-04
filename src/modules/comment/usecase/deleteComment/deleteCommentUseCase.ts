import { inject, injectable } from "tsyringe";

import { ICommentsRepository } from "../../repository/IComentsRepository";

@injectable()
class DeleteCommentUseCase {
    constructor(
        @inject("CommentsRepository")
        private commentsRepository: ICommentsRepository
    ) {}

    async execute(email: string, id: string): Promise<void> {
        const isAuthor = await this.commentsRepository.getCommentById(id);
        if (isAuthor.author_email !== email) {
            throw new Error("not comment author");
        }
        await this.commentsRepository.delete(id);
    }
}

export { DeleteCommentUseCase };
