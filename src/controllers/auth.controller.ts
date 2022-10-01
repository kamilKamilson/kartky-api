import { Response, Request } from "express";
import { decrypt, encrypt } from "../utils/crypto.util";
import { Mailer } from "../utils/mail.util";
import { PrismaClient } from "@prisma/client";
import messages from "../config/messages.config";
import url from "../utils/url.util";
import { now } from "../utils/time.util";
import { detect } from "detect-browser";
import { generateAccessToken } from "../utils/jwt.util";

const prisma = new PrismaClient();

const msg = messages.auth;

export const login = async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: req.body.email,
                password: encrypt(req.body.password),
            },
            select: {
                id: true,
                email: true,
                name: true,
            },
        });

        if (user) {
            const browser = detect(req.headers["user-agent"]);

            const data = encrypt(
                JSON.stringify({
                    browser: browser,
                    ip: req.headers["x-forwarded-for"] || req.ip,
                })
            );

            const token = generateAccessToken({
                iss: user.id,
            });

            await prisma.loginSession.create({
                data: {
                    userId: user.id,
                    data: data,
                    token: token,
                },
            });

            return res.status(200).json({ messages: "Logged in succesfully", user, token });
        }
        return res.status(400).json({ message: "Credentials are invalid" });
    } catch (err) {
        return res.status(400).json({ message: messages.global.errDatabase });
    }
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
                `/account-confirmation/?token=${encrypt(
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
                message: messages.global.errMail,
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
                        `/auth/account-confirmation/?token=${encrypt(
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
                        message: messages.global.errMail,
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
            message: messages.global.errDatabase,
        });
    }
};

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: req.body.email,
            },
        });

        if (!user)
            return res.status(400).json({
                message: "User with passed email not exists",
            });

        const token = encrypt(
            JSON.stringify({
                uuid: user.id,
                email: user.email,
                exp: now().add(1, "hour"),
            })
        );

        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                forgotToken: token,
            },
        });

        try {
            const mail = await new Mailer() //
                .setTo(user.email)
                .setSubject("Reset password")
                .setHtml("reset-password", { subject: "Reset password", url: url(`/reset-password?token=${token}`) });

            await mail.send();

            return res.status(200).json({
                message: "Password link has been send",
            });
        } catch (err) {
            return res.status(400).json({
                message: messages.global.errMail,
            });
        }
    } catch (err) {
        return res.status(400).json({
            message: messages.global.errDatabase,
        });
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const data = JSON.parse(decrypt(req.query.token as string));

        if (!now().isBefore(data.exp))
            return res.status(400).json({
                message: "Reset link expired",
            });

        try {
            await prisma.user.update({
                where: {
                    id: data.uuid,
                },
                data: {
                    password: encrypt(req.body.password),
                    forgotToken: null,
                },
            });

            const mail = await new Mailer() //
                .setTo(data.email)
                .setSubject("Password has been changed")
                .setHtml("password-changed", { subject: "Password has been changed", url: url("/login") });
            await mail.send();

            return res.status(200).json({
                message: msg.passwordReset.success,
            });
        } catch (err) {
            return res.status(400).json({ message: messages.global.errDatabase });
        }
    } catch (err) {
        return res.status(400).json({ message: "Reset link is not valid" });
    }
};

export const accountConfirmation = async (req: Request, res: Response) => {
    try {
        const hash = decrypt(req.body.token);
        const data: EmailConfirmationData = JSON.parse(hash);
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

            const mail = await new Mailer() //
                .setTo(data.email)
                .setSubject("Account confirmed")
                .setHtml("account-confirmed", { subject: "Account confirmed", url: url("/login") });
            await mail.send();

            return res.status(200).json({
                message: msg.accountConfirmation.success,
            });
        } catch (err) {
            return res.status(400).json({
                message: messages.global.errDatabase,
            });
        }
    } catch (err) {
        return res.status(400).json({
            message: msg.accountConfirmation.tokenNotValid,
        });
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        await prisma.loginSession.update({
            where: {
                id: req.tokenId,
            },
            data: {
                active: false,
            },
        });

        return res.status(200).json({
            message: msg.logout.success,
        });
    } catch (err) {
        return res.status(400).json({
            message: messages.global.errDatabase,
        });
    }
};
