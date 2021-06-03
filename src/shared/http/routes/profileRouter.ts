import { Router } from "express";

import { FollowProfileController } from "../../../modules/profile/usecase/followProfile/FollowProfileController";
import { GetProfileController } from "../../../modules/profile/usecase/getProfile/getProfileController";
import { UnFollowProfileController } from "../../../modules/profile/usecase/unfollowProfile/unFollowProfileController";
import { authentication } from "../middlewares/authentication";

const profileRoutes = Router();
const getProfileController = new GetProfileController();
const followProfileController = new FollowProfileController();
const unfollowProfileController = new UnFollowProfileController();

profileRoutes.get("/:username", authentication, getProfileController.handle);
profileRoutes.post(
    "/:username/follow",
    authentication,
    followProfileController.handle
);
profileRoutes.delete(
    "/:username/follow",
    authentication,
    unfollowProfileController.handle
);

export { profileRoutes };
