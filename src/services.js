import User from "./models.js";

export const createNewUser = async (firstname, lastname, username, phoneNumber, email, password) => {
    const user = User.create({firstname, lastname, username, phoneNumber, email, password});
}

