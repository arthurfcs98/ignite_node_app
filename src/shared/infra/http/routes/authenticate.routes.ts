import { Router } from "express";

import { AuthenticateUserController } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "@modules/accounts/useCases/refreshToken/RefreshTokenController";
import { ResetPasswordController } from "@modules/accounts/useCases/resetPassword/ResetPasswordController";
import { SendForgotPasswordEmailController } from "@modules/accounts/useCases/sendForgotPasswordEmail/SendForgotPasswordEmailController";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();
const sendForgotPasswordEmailController =
    new SendForgotPasswordEmailController();
const resetPasswordController = new ResetPasswordController();

authenticateRoutes.post("/sessions", authenticateUserController.handle);
authenticateRoutes.post("/refresh-token", refreshTokenController.handle);
authenticateRoutes.post(
    "/password/forgot",
    sendForgotPasswordEmailController.handle
);
authenticateRoutes.post("/password/reset", resetPasswordController.handle);
export { authenticateRoutes };
