import nodemailer, { Transporter } from "nodemailer";
import envResolver from "./envResolver.util";

envResolver();

type MailOptions = {
    from: string;
    to: string;
    subject: string;
    text: string;
    html: string;
};

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT);
const SMTP_NAME = process.env.SMTP_NAME;
const SMTP_USERNAME = process.env.SMTP_USERNAME;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;

export class Mailer {
    transporter: Transporter;
    mailOptions: MailOptions = {
        from: `"${SMTP_NAME}" <noreply@kartky.com>`,
        to: "",
        subject: "",
        text: "",
        html: "",
    };

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: SMTP_PORT,
            auth: {
                user: SMTP_USERNAME, // generated ethereal user
                pass: SMTP_PASSWORD, // generated ethereal password
            },
        });
    }

    setFrom = (from: string) => {
        this.mailOptions = { ...this.mailOptions, from };
        return this;
    };

    setTo = (to: string) => {
        this.mailOptions = { ...this.mailOptions, to };
        return this;
    };

    setSubject = (subject: string) => {
        this.mailOptions = { ...this.mailOptions, subject };
        return this;
    };

    setHtml = (html: string) => {
        this.mailOptions = { ...this.mailOptions, html };
        return this;
    };

    send = async () => {
        await this.transporter.sendMail(this.mailOptions);
    };
}
