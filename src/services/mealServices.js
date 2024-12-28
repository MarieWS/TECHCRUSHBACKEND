import { Meal } from "../models/mealModel.js"

// calculate Basal Metabolic rate (BMR)
export const basalMetabolicRate = (age, gender, weight, height) => {
    if (gender == 'male') {
        return (10 * weight) + (6.25 * height) - (5 * age) + 5
    } else {
        return (10 * weight) + (6.25 * height) - (5 * age) - 161
    }
}

export const totalDailyEnergyExpenditure = (basalMetabolicRate, activityLevel) => {
    switch (activityLevel) {
        case 'sedentary':
            return basalMetabolicRate * 1.2
        case 'lightly active':
            return basalMetabolicRate * 1.375
        case 'moderately active':
            return basalMetabolicRate * 1.55
        case 'very active':
            return basalMetabolicRate * 1.725
        case 'super active':
            return basalMetabolicRate * 1.9
    }
}

export const generateMeal = async (dietary_preferences, health_goals, medical_condition, region) => {
    const meals = await Meal.find({ 
        diet_type: {$regex: dietary_preferences, $options: 'i'}, 
        health_benefit: {$regex: health_goals, $options: 'i'}
    });
    console.log(meals);
}