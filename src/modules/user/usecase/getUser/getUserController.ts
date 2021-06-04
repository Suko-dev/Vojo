import { Response, Request } from "express";
import { container } from "tsyringe";

import { IResponseUserDTO } from "../../dtos/IResponseUserDTO";
import { GetUserUseCase } from "./getUserUseCase";

class GetUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const getUserUseCase = container.resolve(GetUserUseCase);

        const { email, token } = request.user;
        let user: IResponseUserDTO | undefined;

        try {
            user = await getUserUseCase.execute(String(email), String(token));
        } catch (error) {
            return response.status(400).json(error.message);
        }
        return response.status(200).json(user);
    }
}
export { GetUserController };
