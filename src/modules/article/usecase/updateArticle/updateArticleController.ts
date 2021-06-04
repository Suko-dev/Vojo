import { Response, Request } from "express";
import { container } from "tsyringe";

import { IResponseArticleDTO } from "../../dtos/IResponseArticleDTO";
import { IUpdateArticleDTO } from "../../dtos/IUpdateArticleDTO";
import { UpdateArticleUseCase } from "./updateArticleUseCase";

class UpdateArticleController {
    async handle(request: Request, response: Response): Promise<Response> {
        const updateArticleUseCase = container.resolve(UpdateArticleUseCase);

        const { title, description, body }: IUpdateArticleDTO = request.body;
        const { slug } = request.params;
        let article: IResponseArticleDTO | undefined;
        try {
            article = await updateArticleUseCase.execute({
                slug,
                title,
                description,
                body,
            });
        } catch (error) {
            return response.status(400).json(error.message);
        }
        return response.status(200).json(article);
    }
}
export { UpdateArticleController };
