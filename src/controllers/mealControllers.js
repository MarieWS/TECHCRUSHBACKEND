import * as mealServices from '../services/mealServices.js';

export const generateMeal = async (req, res) => {
    const { gender, age, country, region, dietary_preferences, health_goals, activity_levels, allergies, medical_condition, height, weight } = req.query;

    try {
        mealServices.generateMeal(dietary_preferences, health_goals, medical_condition, region);
        res.status(200).json({ message: "Meal generated" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}