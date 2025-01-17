import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_PORT === '465',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendVerifyEmailLink = async (email, token) => {
    const verifyEmailLink = `http://${process.env.FRONTEND_URL}/verifyEmail.html?token=${token}`;

    const message = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Delish Nutrio - Verify Your Email",
        html: `<p>Thank you for registering with Delish Nutrio! <br> Click the link below to confirm your email address</p> <p><a href='${verifyEmailLink}'>${verifyEmailLink}</a><br><b>Please Note that this link will expire in the next 1 Hour!</b></p>`,
    }

    await transporter.sendMail(message);
};