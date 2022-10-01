import { Router } from "express";
import { login, register, accountConfirmation, resetPassword, forgotPassword, logout } from "../controllers/auth.controller";
import loginRules from "../middlewares/rules/auth/login.rule";
import registerRules from "../middlewares/rules/auth/register.rule";
import resetPasswordRules from "../middlewares/rules/auth/resetPassword.rule";
import forgotPasswordRules from "../middlewares/rules/auth/forgotPassword.rule";
import validate from "../utils/validate.util";
import autorizationMiddleware from "../middlewares/authorization.middleware";

export const router: Router = Router();

router.route("/login").post(validate(loginRules), login);
router.route("/register").post(validate(registerRules), register);
router.route("/forgot-password").post(validate(forgotPasswordRules), forgotPassword);
router.route("/reset-password").post(validate(resetPasswordRules), resetPassword);
router.route("/account-confirmation").post(accountConfirmation);

router.route("/logout").get(autorizationMiddleware, logout);
