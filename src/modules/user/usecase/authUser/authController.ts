import { Request, Response } from "express";
import { container } from "tsyringe";

import { IResponseUserDTO } from "../../dtos/IResponseUserDTO";
import { AuthUserUseCase } from "./authUsecase";

class AuthUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        let token: IResponseUserDTO | undefined;
        try {
            const authUserUseCase = container.resolve(AuthUserUseCase);
            const { email, password } = request.body;

            token = await authUserUseCase.execute({ email, password });
        } catch (error) {
            return response.status(400).json(error.message);
        }
        return response.status(200).json(token);
    }
}

export { AuthUserController };
