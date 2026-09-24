import express from "express"
import cookieParser from "cookie-parser";
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url';

const app = express();

import { errMiddleware } from './middlewares/ErrorMiddleware.js';
import userRoutes from './routes/userRoutes.js'
import recipeRoutes from './routes/recipeRoutes.js'

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser())

app.use('/user', userRoutes)
app.use('/recipe', recipeRoutes)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

// Catch-all: serve the frontend for any route not handled above
app.use((req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

//global error middleware
app.use(errMiddleware)

export {app}