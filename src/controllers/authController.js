import { User } from "../models.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

export const generateToken = (id) => {
    return jwt.sign(
        { userID: id }, process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION })
}

export const login = async (req, res) => {
    const { emailOrPhone, password } = req.body;

    // check if field is empty
    if (!emailOrPhone || !password) {
        return res.status(400).json({ message: "Please, fill in the required details" });
    }

    // check whether user used email or phone number
    let user
    if (isNaN(emailOrPhone)) {
        user = await User.findOne({ where: { email: emailOrPhone } });
    } else {
        user = await User.findOne({ where: { phone_number: emailOrPhone } });
    }

    // check if password matches email/phone number
    if (!user || !bcrypt.compare(password, user.password)) {
        return res.status(400).json({ message: "Invalid email or password" });
    } else {
        const token = generateToken(user.id);
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 3 * 24 * 60 * 60 * 1000 });
        return res.status(200).json({ message: "Login successful"});
    }
}