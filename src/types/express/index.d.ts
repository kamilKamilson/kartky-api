import { LoginSession, User } from "@prisma/client";
import express from "express";

declare global {
    namespace Express {
        interface Request {
            data?: EmailConfirmationData;
            tokenId?: string;
            user?: User;
        }
    }

    interface EmailConfirmationData {
        uuid: string;
        email: string;
    }
}
