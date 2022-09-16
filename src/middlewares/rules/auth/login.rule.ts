import { body } from "express-validator";

const rules = [
    body("email").exists().bail().withMessage("Email is required").isEmail().withMessage("Field must be email"), //
    body("password").exists().bail().withMessage("Password is required"),
];

export default rules;
