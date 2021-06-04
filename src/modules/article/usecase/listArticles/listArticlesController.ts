import { Response, Request } from "express";
import { container } from "tsyringe";

import { IGetArticleDTO } from "../../dtos/IGetArticleDTO";
import { IResponseArticleDTO } from "../../dtos/IResponseArticleDTO";
import { ListArticlesUseCase } from "./listArticlesUseCase";

class ListArticlesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listArticlesUseCase = container.resolve(ListArticlesUseCase);

        let email: string | undefined;
        const { tag, favorited, author, limit, offset }: IGetArticleDTO =
            request.query;
        if (request.user) {
            email = request.user.email;
        }
        let articles: IResponseArticleDTO[] | undefined;
        try {
            articles = await listArticlesUseCase.execute({
                feed: false,
                email,
                pageLimit: limit,
                page: offset,
                tag,
                favorited,
                author,
            });
        } catch (error) {
            return response.status(400).json(error.message);
        }
        return response.status(200).json(articles);
    }
}
export { ListArticlesController };
