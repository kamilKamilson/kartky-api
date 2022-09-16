import { Response, Request } from "express";
import { encrypt } from "../utils/crypto.util";

export const login = (req: Request, res: Response) => {
    console.log("logowanie");
    res.end();
};

export const register = (req: Request, res: Response) => {
    console.log("register");

    res.end(req.url);
};

export const checkForgotPasswordToken = (req: Request, res: Response) => {
    console.log("forgotPasswordToken");

    res.end(req.url);
};

export const forgotPassword = (req: Request, res: Response) => {
    console.log("forgotPassword");

    res.end(req.url);
};

export const accountConfirmation = (req: Request, res: Response) => {
    console.log("accountConfirmation");

    res.end();
};
