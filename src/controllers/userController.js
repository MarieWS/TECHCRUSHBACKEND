import * as services from "../services.js";

export const createNewUser = async (req, res) => {
    const { firstname, lastname, username, phone_number, email, password } = req.body;
    try {
        const user = await services.createNewUser(firstname, lastname, username, phone_number, email, password);
        res.status(201).json({ message: "User created" })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const createNewProfile = async (req, res) => {
    const UserId = req.user
    const { gender, age, country, region, dietary_preferences, health_goals, activity_levels, allergies, medical_condition, height, weight } = req.body;
    try {
        const userProfile = await services.createNewProfile(gender, age, country, region, dietary_preferences, health_goals, activity_levels, allergies, medical_condition, height, weight, UserId )
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