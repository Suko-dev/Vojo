import { Response, Request } from "express";
import { container } from "tsyringe";

import { IResponseProfileDTO } from "../../dtos/IResponseProfileDTO";
import { FollowProfileUseCase } from "./FollowProfileUseCase";

class FollowProfileController {
    async handle(request: Request, response: Response): Promise<Response> {
        const followProfileUseCase = container.resolve(FollowProfileUseCase);

        const { username } = request.params;
        const { email } = request.user;
        let profile: IResponseProfileDTO | undefined;
        try {
            profile = await followProfileUseCase.execute(
                String(username),
                String(email)
            );
        } catch (error) {
            return response.status(400).json(error.message);
        }
        return response.status(200).json(profile);
    }
}
export { FollowProfileController };
