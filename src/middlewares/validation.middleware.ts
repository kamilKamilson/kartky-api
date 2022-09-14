import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";

export const validation = (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate({ ...req.body, ...req.query }, { abortEarly: false });
    console.log(error?.details);

    if (error) return res.status(422).json(error.details);
    next();
};
