import {User, UserProfile } from "./models.js";
import bcrypt from 'bcryptjs';

export const createNewUser = async (firstname, lastname, username, phone_number, email, password) => {
    const passwordHash = bcrypt.hashSync(password, 10)
    const user = User.create({firstname, lastname, username, phone_number, email, password: passwordHash});
}

// export const createNewUserProfile = async ()