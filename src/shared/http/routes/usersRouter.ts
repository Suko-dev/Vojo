import { Router } from "express";

import { AuthUserController } from "../../../modules/user/usecase/authUser/authController";
import { CreateUserController } from "../../../modules/user/usecase/createUser/createUserController";

const createUserController = new CreateUserController();
const authUserController = new AuthUserController();

const usersRouter = Router();

usersRouter.post("/", createUserController.handle);
usersRouter.post("/login", authUserController.handle);

export { usersRouter };
