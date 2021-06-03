import { Response, Request } from "express";
import { container } from "tsyringe";

import { IResponseUserDTO } from "../../dtos/IResponseUserDTO";
import { GetUserUseCase } from "./getUserUseCase";

class GetUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const getUserUseCase = container.resolve(GetUserUseCase);

        const { email } = request.user;
        const token = request.headers.authorization;
        let user: IResponseUserDTO;
        try {
            user = await getUserUseCase.execute(email, String(token));
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
        return response.status(200).json(user);
    }
}
export { GetUserController };
