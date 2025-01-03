import * as services from "../services/userServices.js";
import { sendVerifyEmailLink } from "../services/emailServices.js";


export const createNewUser = async (req, res) => {
    const { firstname, lastname, username, phone_number, email, password } = req.body;
    try {
        const {emailToken, emailTokenExpires} = services.generateVerifyEmailToken()
        const user = await services.createNewUser(firstname, lastname, username, phone_number, email, password, emailToken, emailTokenExpires);
        sendVerifyEmailLink(email, emailToken);
        res.status(201).json({ message: "User created" })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const verifyEmail = async (req, res) => {
    const { token } = req.params;
    try {
        const verifyEmail = await services.verifyEmail(token);

        if (!verifyEmail) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        res.status(200).json({ message: "Email verified" })
    } catch (error) {
        res.status(400).json({ error: error.message }) 
    }
}

export const createNewProfile = async (req, res) => {
    const UserId = req.user
    const { gender, age, country, region, dietary_preferences, health_goals, activity_levels, allergies, medical_condition, height, weight } = req.body;
    try {
        const userProfile = await services.createNewProfile(gender, age, country, region, dietary_preferences, health_goals, activity_levels, allergies, medical_condition, height, weight, UserId )
        res.status(201).json({ message: "Profile created", userProfile })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const getUserProfile = async (req, res) => {
    const UserId = req.user
    try {
        const profile = await services.getUserProfile(UserId);
        res.status(200).json(profile)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const updateUserProfile = async (req, res) => {
    const UserId = req.user
    const { gender, age, country, region, dietary_preferences, health_goals, activity_levels, allergies, medical_condition, height, weight } = req.body;

    try {
        const updateProfile = await services.updateProfile(gender, age, country, region, dietary_preferences, health_goals, activity_levels, allergies, medical_condition, height, weight, UserId)
        res.status(200).json({ message: "Profile updated", updateProfile })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}