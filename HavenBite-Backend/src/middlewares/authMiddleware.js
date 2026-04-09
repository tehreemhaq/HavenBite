import jwt from "jsonwebtoken"
import { userModel } from "../models/userModel.js"
import { ApiError } from "../helpers/ApiErrors.js";

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies?.AccessToken; // 👈 exact name match

        if (!token) {
            throw new ApiError(401, "unauthorized access")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_SECRET_KEY)

        const user = await userModel.findById(decodedToken?._id) // 👈 _id not id
        if (!user) {
            throw new ApiError(401, "Invalid token")
        }

        req.user = user
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
}

export { authMiddleware }