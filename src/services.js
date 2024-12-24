import {User, UserProfile } from "./models.js";

export const createNewUser = async (firstname, lastname, username, phone_number, email, password) => {
    const user = User.create({firstname, lastname, username, phone_number, email, password});
}

export const createNewUserProfile = async ()