import Jwt from "jsonwebtoken"
import nodemailer from "nodemailer";
import { htmlCode } from "./emailTemplate.js";
export const sendEmail = async (email) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.EMAIL_NAME,
            pass: process.env.EMAIL_PASS,
        },
    });

    let token = Jwt.sign({ email }, 'sendingEmail')
    const info = await transporter.sendMail({
        from: `"Mohamed Ansary" ${process.env.EMAIL_NAME}`, // sender address
        to: email, // list of receivers
        subject: "Hello ✔", // Subject line
        html: htmlCode(token), // html body
    });

    console.log("Message sent: %s", info.messageId);
}