import { Response, Request } from "express";
import { container } from "tsyringe";

import { DeleteArticleUseCase } from "./deleteArticleUseCase";

class DeleteArticleController {
    async handle(request: Request, response: Response): Promise<Response> {
        const deleteArticleUseCase = container.resolve(DeleteArticleUseCase);

        const { slug } = request.params;
        const { email } = request.user;

        try {
            await deleteArticleUseCase.execute(String(slug), String(email));
            return response.status(204).send();
        } catch (error) {
            return response.status(400).json(error.message);
        }
    }
}
export { DeleteArticleController };
