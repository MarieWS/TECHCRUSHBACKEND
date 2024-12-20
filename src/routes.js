import express from "express";
import * as controllers from './controllers.js';
import { validateForm } from "./middleware.js";

const router = express.Router();

router.post('/register', validateForm, controllers.createNewUser);

export default router

