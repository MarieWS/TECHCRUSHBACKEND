import express from "express";
import * as userControllers from './controllers/userController.js';
import { validateForm } from "./middleware/formValidation.js";
import { login } from "./controllers/authController.js";
import auth from "./middleware/auth.js";

const router = express.Router();

router.post('/register', validateForm, userControllers.createNewUser);
router.post('/login', login);
router.post('/newprofile', auth, userControllers.createNewProfile);



export default router

