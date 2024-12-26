import express from "express";
import * as userControllers from './controllers/userController.js';
import { validateForm } from "./middleware/formValidation.js";
import { login } from "./controllers/authController.js";
import auth from "./middleware/auth.js";

const router = express.Router();

router.post('/register', validateForm, userControllers.createNewUser);
router.post('/login', login);
router.post('/newprofile', auth, userControllers.createNewProfile);
router.get('/profile', auth, userControllers.getUserProfile);
router.put('/updateprofile', auth, userControllers.updateUserProfile);

export default router

