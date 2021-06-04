import { IResponseCommentDTO } from "../dtos/IResponseCommentDTO";
import { Comment } from "../entity/Comments";

interface ICommentsRepository {
    getComment(slug: string, email?: string): Promise<IResponseCommentDTO[]>;
    create(
        body: string,
        email: string,
        slug: string
    ): Promise<IResponseCommentDTO>;
    delete(id: string): Promise<void>;
    getCommentById(id: string): Promise<Comment>;
}

export { ICommentsRepository };
