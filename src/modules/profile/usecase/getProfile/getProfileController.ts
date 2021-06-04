import { Response, Request } from "express";
import { container } from "tsyringe";

import { IResponseProfileDTO } from "../../dtos/IResponseProfileDTO";
import { GetProfileUseCase } from "./getProfileUseCase";

class GetProfileController {
    async handle(request: Request, response: Response): Promise<Response> {
        const getProfileUseCase = container.resolve(GetProfileUseCase);

        const { username } = request.params;
        const { email } = request.user;
        let profile: IResponseProfileDTO | undefined;
        try {
            profile = await getProfileUseCase.execute(String(username), email);
        } catch (error) {
            return response.status(400).json(error.message);
        }
        return response.status(200).json(profile);
    }
}
export { GetProfileController };
