import crypto from "crypto"

import { userModel } from "../models/userModel.js"
import { ApiError } from "./ApiErrors.js"


const generateRefreshAndAccessToken = async (user) => {
    try {
        const refreshToken = user.generateRefreshToken()
        const accessToken = user.generateAccessToken()
        const hashedRefreshToken = crypto.createHash("sha256").update(refreshToken).digest("hex")

        user.refreshToken = hashedRefreshToken
        await user.save({ validateBeforeSave: false })
        return { refreshToken, accessToken }
    } catch (error) {
        console.log("error in generate token helper :", error)
        throw new ApiError(500, "something went wrong while generating access and refresh token")

    }
}


const generateEmailVerificationToken = async (user) => {
    try {
        const verificationToken = crypto.randomBytes(32).toString("hex")
        const hashedVerificationToken = crypto.createHash("sha256").update(verificationToken).digest("hex")
        const expiry = new Date(Date.now() + 15 * 60 * 1000);

        const userWithToken = await userModel.findOneAndUpdate(
            { _id: user._id },
            { $set: { emailVerificationToken: hashedVerificationToken, emailVerificationExpiry: expiry } },
            { new: true }
        )
        console.log("user with email verification token :" , userWithToken)
        return verificationToken


    } catch (error) {
        console.log("error while generating email verification token :", error)
        throw new ApiError(500, "something went wrong while generating email verification token")
    }

}


export { generateRefreshAndAccessToken, generateEmailVerificationToken }