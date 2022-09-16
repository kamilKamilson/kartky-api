import sgMail from "@sendgrid/mail";
import envResolver from "./envResolver.util";

envResolver();

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export const mailer = () => {
    const msg = {
        to: "kamilochynski@gmail.com", // Change to your recipient
        from: "noreply@kartky.com", // Change to your verified sender
        subject: "Sending with SendGrid is Fun",
        text: "and easy to do anywhere, even with Node.js",
        html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    };

    sgMail
        .send(msg)
        .then(() => {
            console.log("Email sent");
        })
        .catch((error) => {
            console.error(error);
        });
};
