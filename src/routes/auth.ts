import { Router } from "express";
import { login, register, forgotPassword, accountConfirmation } from "../controllers/auth.controller";
import { userValidator } from "../middlewares/validators/login.validation";

export const router: Router = Router();

router.route("/login").post(userValidator, login);
router.route("/register").post(register);
router.route("/forgot-password").post(forgotPassword);
router.route("/account-confirmation").get(accountConfirmation);
