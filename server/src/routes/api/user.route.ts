import { Router } from "express";
import userController from "../../controllers/user.controller";
import { controllerWrapper, validation } from "../../middlewares/validation/shared";
import { joiUserSchema } from "../../middlewares/validation/joiValidation";

const userRouter: Router = Router();

// @route   POST api/user
// @desc    Register user given their email and password, returns the token upon successful registration
// @access  Public
userRouter.post(
  "/register",
  validation(joiUserSchema),
  controllerWrapper(userController.register.bind(userController))
);

userRouter.post(
  "/login",
  validation(joiUserSchema),
  controllerWrapper(userController.login.bind(userController))
);

export default userRouter;

