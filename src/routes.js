import express from "express";
import * as controllers from './controllers.js';

const router = express.Router();

router.post('/register', controllers.createUser)

export default router

