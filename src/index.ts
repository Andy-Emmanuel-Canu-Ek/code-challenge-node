require('dotenv').config();
import express from "express";
import path from 'path'
import AuthRoutes from "./routes/auth";
import EventRoutes from "./routes/event";
import dbConnection from './database/config';
import cors from 'cors'
//Initializations
const app = express();

//Settings
dbConnection();

//Middlewares
app.use(express.json())
app.use(cors())
app.use('/api/auth', AuthRoutes);
app.use('/api/events', EventRoutes);
app.use(express.static('public'));
// app.use(express.static(path.resolve(__dirname, '../public')));

//Routes

//Static Files

//Starting Server
app.listen(process.env.PORT, () => {
    console.log('Server port', process.env.PORT)
})