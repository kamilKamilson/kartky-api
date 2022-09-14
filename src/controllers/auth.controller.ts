import { Response, Request } from "express";
import { validationResult } from "express-validator";

export const login = (req: Request, res: Response) => {
    const errors = validationResult(req);

    // if there is error then return Error
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array(),
        });
    }

    console.log("logowanie");
    res.end();
};

export const register = (req: Request, res: Response) => {
    console.log("register");

    res.end(req.url);
};

export const forgotPassword = (req: Request, res: Response) => {
    console.log("forgotPassword");

    res.end(req.url);
};

export const accountConfirmation = (req: Request, res: Response) => {
    console.log("accountConfirmation");

    res.end(req.url);
};
