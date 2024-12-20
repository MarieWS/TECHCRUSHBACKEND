import { body, validationResult } from "express-validator";

export const validateForm = [
    body('firstname').isString().notEmpty().withMessage('Please, input your first name'),
    body('lastname').isString().notEmpty().withMessage('Please, input your last name'),
    body('username').isString().notEmpty().withMessage('Please, input your username'),
    body('phoneNumber').isNumeric().notEmpty().withMessage('Provide a valid phone number'),
    body('email').isEmail().notEmpty().withMessage('Please, provide a valid email address'),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 5 characters'),
    body('confirmPassword')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Password does not match");
            } else {
                return true;
            }
        }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
]