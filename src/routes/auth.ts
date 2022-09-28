import { Router } from "express";
import { login, register, forgotPassword, accountConfirmation, checkForgotPasswordToken } from "../controllers/auth.controller";
import loginRules from "../middlewares/rules/auth/login.rule";
import registerRules from "../middlewares/rules/auth/register.rule";
import accountConfirmationRules from "../middlewares/rules/auth/accountConfirmation.rule";
import validate from "../utils/validate.util";

export const router: Router = Router();

router.route("/login").post(validate(loginRules), login);
router.route("/register").post(validate(registerRules), register);
router.route("/check-forgot-password-token").post(checkForgotPasswordToken);
router.route("/forgot-password").post(forgotPassword);
router.route("/account-confirmation").post(validate(accountConfirmationRules), accountConfirmation);
