require('dotenv').config();
import express from "express";
import AuthRoutes from "./routes/auth";
import dbConnection from './database/config';

//Initializations
const app = express();

//Settings
dbConnection();

//Middlewares
app.use(express.json())
app.use('/api/auth', AuthRoutes);

//Routes

//Static Files

//Starting Server
app.listen(process.env.PORT, () => {
    console.log('Server port', process.env.PORT)
})