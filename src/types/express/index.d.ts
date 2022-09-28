import express from "express";

declare global {
    namespace Express {
        interface Request {
            data?: EmailConfirmationData;
        }
    }

    interface EmailConfirmationData {
        uuid: string;
        email: string;
    }
}
