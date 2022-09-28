import { Response, Request } from "express";
import { encrypt } from "../utils/crypto.util";
import { Mailer } from "../utils/mail.util";
import { PrismaClient } from "@prisma/client";
import messages from "../config/messages.config";
import url from "../utils/url.util";

const prisma = new PrismaClient();

const msg = messages.auth;

export const login = (req: Request, res: Response) => {
    console.log("logowanie");
    res.end();
};

export const register = async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.create({
            data: {
                email: req.body.email,
                name: req.body.name,
                password: encrypt(req.body.password),
            },
        });

        try {
            const confirmUrl = url(
                `/account-confirm/?token=${encrypt(
                    JSON.stringify({
                        id: user.id,
                        email: user.email,
                    })
                )}`
            );

            const mail = await new Mailer()
                .setTo(req.body.email)
                .setSubject("Account created succesfully") //
                .setHtml("register", {
                    subject: "Account created succesfully",
                    url: confirmUrl,
                });
            await mail.send();

            return res.status(201).json({
                message: msg.register.created,
            });
        } catch (err) {
            return res.status(400).json({
                message: msg.register.errMail,
            });
        }
    } catch (err: any) {
        if (err.meta.target === "User_email_key") {
            const user = await prisma.user.findFirst({
                where: { email: req.body.email },
            });

            if (!user?.confirmed) {
                try {
                    const confirmUrl = url(
                        `/account-confirm/?token=${encrypt(
                            JSON.stringify({
                                id: user?.id,
                                email: user?.email,
                            })
                        )}`
                    );
                    const mail = await new Mailer() //
                        .setTo(req.body.email)
                        .setSubject("Confirm your account")
                        .setHtml("confirm-account", { subject: "Confirm your account", url: confirmUrl });
                    await mail.send();
                } catch (err) {
                    return res.status(400).json({
                        message: msg.register.errMail,
                    });
                }

                return res.status(400).json({
                    message: msg.register.errExistsNotConfirmed,
                });
            }

            return res.status(400).json({
                message: msg.register.errExists,
            });
        }
        return res.status(400).json({
            message: msg.register.errDatabase,
        });
    }
};

export const checkForgotPasswordToken = (req: Request, res: Response) => {
    console.log("forgotPasswordToken");

    res.end(req.url);
};

export const forgotPassword = (req: Request, res: Response) => {
    console.log("forgotPassword");

    res.end(req.url);
};

export const accountConfirmation = async (req: Request, res: Response) => {
    const data = req.data as EmailConfirmationData;

    try {
        const user = await prisma.user.findFirst({
            where: {
                id: data.uuid,
                email: data.email,
            },
        });

        if (user?.confirmed) {
            return res.status(400).json({
                message: msg.accountConfirmation.alreadyConfirmed,
            });
        }

        await prisma.user.update({
            where: {
                id: data.uuid,
                email: data.email,
            },
            data: {
                confirmed: true,
            },
        });

        try {
            const mail = await new Mailer() //
                .setTo(data.email)
                .setSubject("Account confirmed")
                .setHtml("account-confirmed", { subject: "Account confirmed", url: url("/login") });
            await mail.send();

            return res.status(200).json({
                message: msg.accountConfirmation.success,
                redirect: "/login",
            });
        } catch (err) {
            console.log(err);
        }
    } catch (err) {
        console.log(err);

        return res.status(400).json({
            message: msg.register.errDatabase,
        });
    }

    res.end();
};
