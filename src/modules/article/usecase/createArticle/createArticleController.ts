import { Response, Request } from "express";
import { container } from "tsyringe";

import { ICreateArticleDTO } from "../../dtos/ICreateArticleDTO";
import { IResponseArticleDTO } from "../../dtos/IResponseArticleDTO";
import { CreateArticleUseCase } from "./createArticleUseCase";

class CreateArticleController {
    async handle(request: Request, response: Response): Promise<Response> {
        const createArticleUseCase = container.resolve(CreateArticleUseCase);

        const { title, description, body, taglist }: ICreateArticleDTO =
            request.body;
        const { email } = request.user;
        let article: IResponseArticleDTO | undefined;
        try {
            article = await createArticleUseCase.execute({
                title,
                description,
                body,
                email: String(email),
                taglist,
            });
        } catch (error) {
            return response.status(400).json(error.message);
        }
        return response.status(201).json(article);
    }
}
export { CreateArticleController };
