import { Response, Request } from "express";
import { container } from "tsyringe";

import { IResponseArticleDTO } from "../../dtos/IResponseArticleDTO";
import { GetArticleUseCase } from "./getArticleUseCase";

class GetArticleController {
    async handle(request: Request, response: Response): Promise<Response> {
        const getArticleUseCase = container.resolve(GetArticleUseCase);

        let email: string | undefined;
        const { slug } = request.params;
        if (request.user) {
            email = request.user.email;
        }
        let article: IResponseArticleDTO | undefined;
        try {
            article = await getArticleUseCase.execute(slug, email);
            return response.status(200).json(article);
        } catch (error) {
            return response.status(400).json(error.message);
        }
    }
}
export { GetArticleController };
