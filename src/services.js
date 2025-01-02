import {User, UserProfile } from "./models.js";
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from "uuid";

export const createNewUser = async (firstname, lastname, username, phone_number, email, password, verifyEmailToken, verifyEmailTokenExpires) => {
    const passwordHash = bcrypt.hashSync(password, 10)
    const user = await User.create({firstname, lastname, username, phone_number, email, password: passwordHash, verifyEmailToken, verifyEmailTokenExpires});
}

export const generateVerifyEmailToken = () => {
    const token = uuidv4();
    const tokenExpires = new Date(Date.now() + 10 * 60 * 1000);
    return {token, tokenExpires}
}

export const createNewProfile = async (gender, age, country, region, dietary_preferences, health_goals, activity_levels, allergies, medical_condition, height, weight, UserId) => {
    const profile = await UserProfile.create({gender, age, country, region, dietary_preferences, health_goals, activity_levels, allergies, medical_condition, height, weight, UserId});
}

export const getUserProfile = async (UserId) => {
    const profile = await UserProfile.findOne({where: {UserId}})
    if (!profile) {
        throw new Error("Profile not found")
    }
    return profile;
}

export const updateProfile = async (gender, age, country, region, dietary_preferences, health_goals, activity_levels, allergies, medical_condition, height, weight, UserId) => {
    const profile = await UserProfile.findOne({where: {UserId}});
    const newProfile = await profile.update({gender, age, country, region, dietary_preferences, health_goals, activity_levels, allergies, medical_condition, height, weight})
    return newProfile;
}