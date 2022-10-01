import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import envResolver from "../utils/envResolver.util";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

envResolver();

const autorizationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET as string, async (err, data) => {
        if (err) return res.sendStatus(403);

        data = data as JwtPayload;

        const session = await prisma.loginSession.findFirst({
            where: {
                userId: data.iss,
                token: token,
                active: true,
            },
            select: {
                user: true,
                id: true,
            },
        });

        if (session) {
            req.user = session.user;
            req.tokenId = session.id;
            next();
        } else {
            return res.sendStatus(403);
        }
    });
};

export default autorizationMiddleware;
