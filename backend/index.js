import express from 'express';
import mongoose from 'mongoose';
import router from './Router/Router.js';
import connectDb from './config/DB.js';

import dotenv from 'dotenv';
import cors from 'cors';
const app = express();
dotenv.config();    
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());
connectDb();



app.use(router);

app.listen(process.env.PORT, () => { console.log('server listening') });