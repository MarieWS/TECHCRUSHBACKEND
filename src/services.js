import {User, UserProfile } from "./models.js";
import bcrypt from 'bcryptjs';

export const createNewUser = async (firstname, lastname, username, phone_number, email, password) => {
    const passwordHash = bcrypt.hashSync(password, 10)
    const user = await User.create({firstname, lastname, username, phone_number, email, password: passwordHash});
}

export const createNewProfile = async (gender, age, country, region, dietary_preferences, health_goals, activity_levels, allergies, medical_condition, height, weight, UserId) => {
    const profile = await UserProfile.create({gender, age, country, region, dietary_preferences, health_goals, activity_levels, allergies, medical_condition, height, weight, UserId});
}