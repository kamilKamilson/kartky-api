import { z } from "zod";

const rules = z.object({
    body: z
        .object({
            password: z.string().min(8),
            passwordConfirmation: z.string().min(8),
        })
        .superRefine(({ password, passwordConfirmation }, ctx) => {
            if (password.toLowerCase() === password) {
                ctx.addIssue({
                    code: "custom",
                    path: ["password"],
                    message: "Password must contain uppercase letter",
                });
            }

            //eslint-disable-next-line
            if (!password.match(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
                ctx.addIssue({
                    code: "custom",
                    path: ["password"],
                    message: "Password must contain special character",
                });
            }

            if (!password.match(/\d+/g)) {
                ctx.addIssue({
                    code: "custom",
                    path: ["password"],
                    message: "Password must contain number",
                });
            }

            if (password !== passwordConfirmation) {
                ctx.addIssue({
                    code: "custom",
                    path: ["passwordConfirmation"],
                    message: "",
                });
            }
        }),
    query: z.object({
        token: z.string(),
    }),
});

export default rules;
