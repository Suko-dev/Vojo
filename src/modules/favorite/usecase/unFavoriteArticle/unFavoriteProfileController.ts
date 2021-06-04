import { Response, Request } from "express";
import { container } from "tsyringe";

import { UnFavoriteProfileUseCase } from "./unFavoriteProfileUseCase";

class UnFavoriteProfileController {
    async handle(request: Request, response: Response): Promise<Response> {
        const unFavoriteProfileUseCase = container.resolve(
            UnFavoriteProfileUseCase
        );

        const { slug } = request.params;
        const { email } = request.user;
        try {
            const profile = await unFavoriteProfileUseCase.execute(
                String(email),
                String(slug)
            );
            return response.status(200).json(profile);
        } catch (error) {
            return response.status(400).json(error.message);
        }
    }
}
export { UnFavoriteProfileController };
