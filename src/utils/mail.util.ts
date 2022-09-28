import nodemailer, { Transporter } from "nodemailer";
import envResolver from "./envResolver.util";
import ejs from "ejs";
import path from "path";
envResolver();

type MailOptions = {
    from: string;
    to: string;
    subject: string;
    text: string;
    html: string;
    attachments: {
        filename: string;
        path: string;
        cid?: string;
    }[];
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
        attachments: [],
    };

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: SMTP_PORT,
            auth: {
                user: SMTP_USERNAME,
                pass: SMTP_PASSWORD,
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

    setHtml = async (template: string, data: any = {}) => {
        if (!data.preheader) data.preheader = "";

        const html = (await ejs.renderFile(path.resolve(__dirname, `../views/mails/${template}.ejs`), data)) as string;
        this.mailOptions = { ...this.mailOptions, html };
        return this;
    };

    private addLogo = () => {
        this.mailOptions.attachments.push({
            filename: "logo.png",
            path: path.resolve(__dirname, "../public/logo.png"),
            cid: "logo",
        });
    };

    send = () => {
        this.addLogo();
        return this.transporter.sendMail(this.mailOptions);
    };
}
