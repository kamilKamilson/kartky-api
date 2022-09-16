import { Request, Response } from "express";
import HttpException from "../../exceptions/HttpException";

const errorMiddleware = (err: HttpException, req: Request, res: Response) => {
    return res.status(err.status).send({ status: err.status, message: err.message });
};

export default errorMiddleware;
