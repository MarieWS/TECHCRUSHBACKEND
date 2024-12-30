import express from "express";
import * as userControllers from './controllers/userController.js';
import { validateForm } from "./middleware/formValidation.js";
import { login } from "./controllers/authController.js";
import auth from "./middleware/auth.js";
import { generateMeal } from "./controllers/mealControllers.js";

const router = express.Router();

/** @swagger
 * /api/register:
 *  post: 
 *   summary: Register a new user
 *  requestBody:
 *   required: true
 *  content:
 *  application/json:
 *  schema:
 *  type: object
 * properties:
 * firstname:
 * type: string
 * lastname:
 * type: string
 * username:
 * type: string
 * phone_number:
 * type: string
 * email:
 * type: string
*/
router.post('/register', validateForm, userControllers.createNewUser);
router.post('/login', login);
router.post('/newprofile', auth, userControllers.createNewProfile, userControllers.getUserProfile);
router.get('/dashboard', auth, userControllers.getUserProfile);
router.put('/updateprofile', auth, userControllers.updateUserProfile);

router.get('/generatemeal', auth, generateMeal);
export default router
