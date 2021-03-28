require('dotenv').config();
import express from "express";

//Initializations
const app = express();

//Settings

//Middlewares
app.use(express.json())

//Routes

//Static Files

//Starting Server
app.listen(process.env.PORT, () => {
    console.log('Server port', process.env.PORT)
})