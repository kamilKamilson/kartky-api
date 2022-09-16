import { Request, Response } from "express";

const errorMiddleware = (req: Request, res: Response) => {
    return res.status(404).send({ status: 404, message: "Route not found" });
};

export default errorMiddleware;
