import { Router } from "express";

import { userRouter } from "./userRouter";
import { usersRouter } from "./usersRouter";

const router = Router();

router.use("/users", usersRouter);
router.use("/user", userRouter);

export { router };
