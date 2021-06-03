import { Response, Request } from "express";
import { container } from "tsyringe";

import { IResponseProfileDTO } from "../../dtos/IResponseProfileDTO";
import { GetProfileUseCase } from "./getProfileUseCase";

class GetProfileController {
    async handle(request: Request, response: Response): Promise<Response> {
        const getProfileUseCase = container.resolve(GetProfileUseCase);

        const { username } = request.params;
        const { email } = request.user;
        let user: IResponseProfileDTO;
        try {
            user = await getProfileUseCase.execute(String(username), email);
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
        return response.status(200).json(user);
    }
}
export { GetProfileController };
