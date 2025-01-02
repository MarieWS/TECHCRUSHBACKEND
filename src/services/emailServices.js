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
    const verifyEmailLink = `${process.env.FRONTEND_URL || 'localhost:3000'}/api/verifyEmail/${token}`;

    const message = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Delish Nutrio - Verify Your Email",
        html: `<p>Thank you for registering with Delish Nutrio! <br> Click the link below to confirm your email address</p> <p><a href='${verifyEmailLink}'>${verifyEmailLink}</a></p>`,
    }

    await transporter.sendMail(message);
};