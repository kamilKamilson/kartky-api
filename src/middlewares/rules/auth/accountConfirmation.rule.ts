import { body } from "express-validator";
import envResolver from "../../../utils/envResolver.util";
import FieldException from "../../../exceptions/FieldException";
import { decrypt } from "../../../utils/crypto.util";
import dayjs from "dayjs";
import { now } from "../../../utils/time.util";

envResolver();

const rules = [
    body("token")
        .exists()
        .bail()
        .withMessage("Token is required")
        .custom((value: string, { req }) => {
            try {
                const hash = decrypt(req.body.token);
                const data: EmailConfirmationData = JSON.parse(hash);

                if (dayjs(data.exp).isAfter(now())) {
                    throw new FieldException("Account confitmation expired");
                }
                return true;
            } catch (err) {
                throw new FieldException("Token is not valid");
            }
        }), //
];

export default rules;
