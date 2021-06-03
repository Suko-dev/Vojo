import { Router } from "express";

import { GetUserController } from "../../../modules/user/usecase/getUser/getUserController";
import { UpdateUserController } from "../../../modules/user/usecase/updateUser/updateUserController";
import { authentication } from "../middlewares/authentication";

const updateUserController = new UpdateUserController();
const getUserController = new GetUserController();
const userRouter = Router();

userRouter.put("/", authentication, updateUserController.handle);
userRouter.get("/", authentication, getUserController.handle);

export { userRouter };
