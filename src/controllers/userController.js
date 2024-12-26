import * as services from "../services.js";

export const createNewUser = async (req, res) => {
    const {firstname, lastname, username, phone_number, email, password} = req.body;
    try {
        const user = await services.createNewUser(firstname, lastname, username, phone_number, email, password);
        res.status(201).json({message: "User created"})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}