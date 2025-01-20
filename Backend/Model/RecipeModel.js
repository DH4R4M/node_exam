const mongoose = require('mongoose')

const recipeSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: { type: Array, required: true },
    instructions: { type: String, required: true },
    imageUrl: { type: String },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const RecipeModel = mongoose.model('Recipe', recipeSchema);

module.exports = RecipeModel