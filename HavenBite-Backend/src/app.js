import express from "express"
import cookieParser from "cookie-parser";
import cors from 'cors'



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
app.use('/recipe',recipeRoutes)



//global error middleware
app.use(errMiddleware)




export {app}