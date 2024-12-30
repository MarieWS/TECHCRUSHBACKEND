import * as services from "../services.js";
import path from "path";

const __dirname = import.meta.dirname

export const createNewUser = async (req, res) => {
    const { firstname, lastname, username, phone_number, email, password } = req.body;
    try {
        const user = await services.createNewUser(firstname, lastname, username, phone_number, email, password);
        console.log('Account created')
        res.status(201).sendFile(path.join(__dirname, '../views/accountcreation.html'))
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