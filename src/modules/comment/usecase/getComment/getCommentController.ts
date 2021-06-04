import { Response, Request } from "express";
import { container } from "tsyringe";

import { User } from "../../../user/entity/User";
import { GetCommentUseCase } from "./getCommentUseCase";

class GetCommentController {
    async handle(request: Request, response: Response): Promise<Response> {
        const getCommentUseCase = container.resolve(GetCommentUseCase);

        let email: string | undefined;
        const { slug } = request.params;
        if (request.user) {
            email = request.user.email;
        }
        try {
            const cooments = await getCommentUseCase.execute(slug, email);
            const commentsWithoutPassword = cooments.map((comment) => {
                const { user, ...rest } = comment;
                const { password, email, ...author } = user as User;
                Object.assign(rest, { author });
                return rest;
            });
            return response.status(200).json(commentsWithoutPassword);
        } catch (error) {
            return response.status(400).json(error.message);
        }
    }
}
export { GetCommentController };
