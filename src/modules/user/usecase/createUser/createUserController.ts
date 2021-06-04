import { Response, Request } from "express";
import { container } from "tsyringe";

import { IResponseUserDTO } from "../../dtos/IResponseUserDTO";
import { CreateUserUseCase } from "./createUserUsecase";

class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        let user: IResponseUserDTO | undefined;
        try {
            const createUserUseCase = container.resolve(CreateUserUseCase);

            const { username, email, password } = request.body;
            user = await createUserUseCase.execute({
                username,
                email,
                password,
            });
        } catch (error) {
            return response.status(400).json(error.message);
        }
        return response.status(201).json(user);
    }
}
export { CreateUserController };
