import { body } from "express-validator";
import FieldException from "../../../exceptions/FieldException";
import { decrypt } from "../../../utils/crypto.util";

const rules = [
    body("token")
        .exists()
        .bail()
        .withMessage("Token is required")
        .custom(async (value: string, { req }) => {
            try {
                const hash = decrypt(value);
                const data: EmailConfirmationData = JSON.parse(hash);

                req.data = data;
            } catch (err) {
                throw new FieldException("Token is not valid");
            }
        }), //
];

export default rules;
