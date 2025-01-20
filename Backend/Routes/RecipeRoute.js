const { Router } = require("express");
const RecipeModel = require("../Model/RecipeModel");
const UserModel = require("../Model/UserModel");
const isAuth = require("../Middleware/isAuth");

const RecipeRoute = Router();

// Get all recipes
RecipeRoute.get("/all", async (req, res) => {
    try {
        const recipes = await RecipeModel.find()
            .populate('author', 'username')
            .sort({ createdAt: -1 });
        res.status(200).json(recipes);
    } catch (error) {
        console.error("Error fetching recipes:", error);
        res.status(500).json({ msg: "Error fetching recipes" });
    }
});

// Add new recipe
RecipeRoute.post("/add", isAuth, async (req, res) => {
    try {
        const { title, description, ingredients, instructions, imageUrl } = req.body;

        const newRecipe = await RecipeModel.create({
            title,
            description,
            ingredients,
            instructions,
            imageUrl,
            author: req.user.userID
        });

        await UserModel.findByIdAndUpdate(
            req.user.userID,
            { $push: { recipes: newRecipe._id } }
        );

        res.status(201).json({ 
            msg: "Recipe added successfully", 
            recipe: await newRecipe.populate('author', 'username')
        });
    } catch (error) {
        console.error("Error adding recipe:", error);
        res.status(500).json({ msg: error.message });
    }
});

module.exports = RecipeRoute;