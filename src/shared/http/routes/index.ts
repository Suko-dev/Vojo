import { Router } from "express";

import { profileRoutes } from "./profileRouter";
import { userRouter } from "./userRouter";
import { usersRouter } from "./usersRouter";

const router = Router();

router.use("/users", usersRouter);
router.use("/user", userRouter);
router.use("/profiles", profileRoutes);

export { router };
