import { Response, Request } from "express";

export const login = (req: Request, res: Response) => {
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
