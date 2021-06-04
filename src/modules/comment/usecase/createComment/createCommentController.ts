import { Response, Request } from "express";
import { container } from "tsyringe";

import { ICreateCommentDTO } from "../../dtos/ICreateCommentDTO copy";
import { IResponseCommentDTO } from "../../dtos/IResponseCommentDTO";
import { CreateCommentUseCase } from "./createCommentUseCase";

class CreateCommentController {
    async handle(request: Request, response: Response): Promise<Response> {
        const createCommentUseCase = container.resolve(CreateCommentUseCase);

        const { body }: ICreateCommentDTO = request.body;
        const { email } = request.user;
        const { slug } = request.params;
        let comment: IResponseCommentDTO | undefined;
        try {
            comment = await createCommentUseCase.execute({
                body,
                email: String(email),
                slug,
            });
        } catch (error) {
            return response.status(400).json(error.message);
        }
        return response.status(201).json(comment);
    }
}
export { CreateCommentController };
