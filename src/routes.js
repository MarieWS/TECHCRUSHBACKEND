import express from "express";
import * as controllers from './controllers/userController.js';
import { validateForm } from "./middleware/formValidation.js";
import { login } from "./controllers/authController.js";

const router = express.Router();

router.post('/register', validateForm, controllers.createNewUser);
router.post('/login', login);


export default router

