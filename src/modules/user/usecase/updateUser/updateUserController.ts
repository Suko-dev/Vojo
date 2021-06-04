import { Response, Request } from "express";
import { container } from "tsyringe";

import { IUpdateUserDTO } from "../../dtos/IUpdateUserDTO";
import { User } from "../../entity/User";
import { UpdateUserUseCase } from "./updateUserUsecase";

class UpdateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const updateUserUseCase = container.resolve(UpdateUserUseCase);

        const { username, password, bio, image }: IUpdateUserDTO = request.body;
        const newemail = request.body.email;
        const { email } = request.user;
        let user: User | undefined;
        try {
            user = await updateUserUseCase.execute({
                username,
                newemail,
                password,
                bio,
                image,
                email: String(email),
            });
        } catch (error) {
            return response.status(400).json(error.message);
        }
        return response.status(200).json(user);
    }
}
export { UpdateUserController };
