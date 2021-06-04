import { Response, Request } from "express";
import { container } from "tsyringe";

import { DeleteCommentUseCase } from "./deleteCommentUseCase";

class DeleteCommentController {
    async handle(request: Request, response: Response): Promise<Response> {
        const deleteCommentUseCase = container.resolve(DeleteCommentUseCase);

        const { id } = request.params;
        const { email } = request.user;

        try {
            await deleteCommentUseCase.execute(email as string, id);
            return response.status(204).send();
        } catch (error) {
            return response.status(400).json(error.message);
        }
    }
}
export { DeleteCommentController };
