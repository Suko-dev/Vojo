import { Response, Request } from "express";
import { container } from "tsyringe";

import { FavoriteProfileUseCase } from "./favoriteProfileUseCase";

class FavoriteProfileController {
    async handle(request: Request, response: Response): Promise<Response> {
        const favoriteProfileUseCase = container.resolve(
            FavoriteProfileUseCase
        );

        const { slug } = request.params;
        const { email } = request.user;
        try {
            const profile = await favoriteProfileUseCase.execute(
                String(email),
                String(slug)
            );
            return response.status(200).json(profile);
        } catch (error) {
            return response.status(400).json(error.message);
        }
    }
}
export { FavoriteProfileController };
