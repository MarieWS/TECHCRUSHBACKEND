import { User } from "../models/UserModels.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

export const generateJwtToken = (id) => {
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
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (user && passwordCheck) {
        const token = generateJwtToken(user.id)
        res.cookie("jwtToken", token, { 
            httpOnly: true, 
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: "None",
            secure: true});
        return res.status(200).json({ message: "Login successful"})
    } else {
        return res.status(400).json({ message: "Invalid email or password" });
    }
}

export const logout = async (req, res) => {
    res.clearCookie("jwtToken");
    res.status(200).json({ message: "Logout successful" });
}