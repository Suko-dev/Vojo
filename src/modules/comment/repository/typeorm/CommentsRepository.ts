import { getRepository, Repository } from "typeorm";

import { IResponseCommentDTO } from "../../dtos/IResponseCommentDTO";
import { Comment } from "../../entity/Comments";
import { ICommentsRepository } from "../IComentsRepository";

class CommentsRepository implements ICommentsRepository {
    private commentsRepository: Repository<Comment>;

    constructor() {
        this.commentsRepository = getRepository(Comment);
    }
    async getCommentById(id: string): Promise<Comment> {
        const comment = await this.commentsRepository.findOneOrFail({ id });
        return comment;
    }
    async getComment(
        slug: string,
        email?: string
    ): Promise<IResponseCommentDTO[]> {
        const comments = await this.commentsRepository.find({
            where: { slug },
            relations: ["user"],
        });
        return comments;
    }
    async create(
        body: string,
        email: string,
        slug: string
    ): Promise<IResponseCommentDTO> {
        const comment = this.commentsRepository.create({
            body,
            author_email: email,
            slug,
        });
        await this.commentsRepository.save(comment);
        return comment;
    }
    async delete(id: string): Promise<void> {
        await this.commentsRepository.delete({ id });
    }
}

export { CommentsRepository };
