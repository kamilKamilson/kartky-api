import { body } from "express-validator";

export const userValidator = [body("email").exists().bail().isEmail()];
