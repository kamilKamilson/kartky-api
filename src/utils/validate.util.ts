import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod/lib";

const validate = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });

        next();
    } catch ({ errors }) {
        return res.status(400).json({
            message: "Fields are not valid",
            errors: errors,
        });
    }
};

export default validate;
