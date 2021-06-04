import { Response, Request } from "express";
import { container } from "tsyringe";

import { IGetArticleDTO } from "../../dtos/IGetArticleDTO";
import { IResponseArticleDTO } from "../../dtos/IResponseArticleDTO";
import { FeedArticlesUseCase } from "./feedArticlesUseCase";

class FeedArticlesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const feedArticlesUseCase = container.resolve(FeedArticlesUseCase);

        const { limit, offset }: IGetArticleDTO = request.query;
        const { email } = request.user;

        let articles: IResponseArticleDTO[] | undefined;
        try {
            articles = await feedArticlesUseCase.execute({
                feed: true,
                email,
                pageLimit: limit,
                page: offset,
            });
        } catch (error) {
            return response.status(400).json(error.message);
        }
        return response.status(200).json(articles);
    }
}
export { FeedArticlesController };
