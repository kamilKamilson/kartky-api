import { Router } from "express";
import { login, register, forgotPassword, accountConfirmation } from "../controllers/auth.controller";
import { loginSchema, registerSchema, forgotPasswordSchema, accountConfirmationSchema } from "../middlewares/schemas/auth.middleware";
import { validation } from "../middlewares/validation.middleware";

export const router: Router = Router();

router.route("/login").post(validation(loginSchema), login);
router.route("/register").post(validation(registerSchema), register);
router.route("/forgot-password").post(validation(forgotPasswordSchema), forgotPassword);
router.route("/account-confirmation").get(validation(accountConfirmationSchema), accountConfirmation);
