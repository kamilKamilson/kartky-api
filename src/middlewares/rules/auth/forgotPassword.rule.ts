import { body } from "express-validator";
import FieldException from "../../../exceptions/FieldException";

const rules = [
    body("name").exists().bail().withMessage("Name is required"),
    body("email").exists().bail().withMessage("Email is required").isEmail().withMessage("Field must be email"), //
    body("password").exists().bail().withMessage("Password is required"),
    body("passwordConfirmation").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new FieldException("Password confirmation does not match password");
        }

        return true;
    }),
];

export default rules;
