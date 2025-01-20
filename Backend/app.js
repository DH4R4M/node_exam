const express = require('express')
const connectDB = require('./Config/server')
const cors = require('cors')
const UserRoute = require('./Routes/UserRoute')
const RecipeRoute = require('./Routes/RecipeRoute')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors())

app.use('/users', UserRoute);
app.use('/recipes', RecipeRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
connectDB();
    console.log(`Server running on port ${PORT}`);
})