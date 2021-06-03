import { Response, Request } from "express";
import { container } from "tsyringe";

import { IResponseProfileDTO } from "../../dtos/IResponseProfileDTO";
import { FollowProfileUseCase } from "./FollowProfileUseCase";

class FollowProfileController {
    async handle(request: Request, response: Response): Promise<Response> {
        const followProfileUseCase = container.resolve(FollowProfileUseCase);

        const { username } = request.params;
        const { email } = request.user;
        let user: IResponseProfileDTO;
        try {
            user = await followProfileUseCase.execute(
                String(username),
                String(email)
            );
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
        return response.status(200).json(user);
    }
}
export { FollowProfileController };
