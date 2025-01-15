import {User, UserProfile } from "../models/UserModels.js";
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from "uuid";
import { Op } from "sequelize";

export const createNewUser = async (firstname, lastname, username, phone_number, email, password, verifyEmailToken, verifyEmailTokenExpires) => {
    const passwordHash = bcrypt.hashSync(password, 10)
    const user = await User.create({firstname, lastname, username, phone_number, email, password: passwordHash, verifyEmailToken, verifyEmailTokenExpires});
    return user;
}

export const updateUser = async (firstname, lastname, username, phone_number, email, password, verifyEmailToken, verifyEmailTokenExpires, UserId) => {
    const user = await User.findOne({where: {id: UserId}});
    const passwordHash = bcrypt.hashSync(password, 10)
    const updatedUser = await user.update({firstname, lastname, username, phone_number, email, password:passwordHash, verifyEmailToken, verifyEmailTokenExpires});
}

export const generateVerifyEmailToken = () => {
    const emailToken = uuidv4();
    const emailTokenExpires = new Date(Date.now() + 60 * 60 * 1000);
    return {emailToken, emailTokenExpires}
}

export const verifyEmail = async (token) => {
    const user = await User.findOne({where: {verifyEmailToken: token, verifyEmailTokenExpires: { [Op.gt]: Date.now() } }});
    
    if (!user) return;

    const updatedUser = await user.update({isVerified: true, verifyEmailToken: null, verifyEmailTokenExpires: null});
    return updatedUser;
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