import { inject, injectable } from "tsyringe";

import { ICreateCommentDTO } from "../../dtos/ICreateCommentDTO copy";
import { IResponseCommentDTO } from "../../dtos/IResponseCommentDTO";
import { ICommentsRepository } from "../../repository/IComentsRepository";

@injectable()
class CreateCommentUseCase {
    constructor(
        @inject("CommentsRepository")
        private comentsRepository: ICommentsRepository
    ) {}

    async execute({
        body,
        email,
        slug,
    }: ICreateCommentDTO): Promise<IResponseCommentDTO> {
        const comment = await this.comentsRepository.create(body, email, slug);
        return comment;
    }
}

export { CreateCommentUseCase };
