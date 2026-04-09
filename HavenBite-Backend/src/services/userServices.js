import crypto from 'node:crypto';

import { userModel } from "../models/userModel.js"
import { ApiError } from "../helpers/ApiErrors.js"
import { generateRefreshAndAccessToken , generateEmailVerificationToken } from "../helpers/generateToken.js"
import { sendEmail } from "../helpers/emailSender.js"






const userRegisterService = async ({ username, email, password }) => {

    const userExists = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (userExists) {
        throw new ApiError(409, "user already exists")
    }

    const user = await userModel.create({ username, email, password })
    console.log("created user : ", user)

    return user;

}


const GenerateVerificationEmailService = async (user) => {

    const verificationToken = await generateEmailVerificationToken(user)

    const data = await sendEmail(verificationToken)
    console.log("returned data from sending email :", data)

}


const userEmailVerificationService = async (hashedReceivedToken) => {
    try {
        const userWithVerificationToken = await userModel.findOne({ emailVerificationToken: hashedReceivedToken, emailVerificationExpiry: { $gt: Date.now() } })
        if (!userWithVerificationToken) {
            throw new ApiError(401, "invalid or expired token")
        }

        if(userWithVerificationToken.isVerified){
            throw new ApiError(200 , "your account has already been successfully verified")
        }

        const userAfterVerification = await userModel.findOneAndUpdate(
            { _id: userWithVerificationToken._id },
            { $set: { emailVerificationToken: "", emailVerificationExpiry: "", isVerified: true } },
            { new: true }
        )
        console.log("user after verification : ", userAfterVerification)
    } catch (error) {
        console.log("error in email verification service :", error)
        throw new ApiError(500, "something went wrong while email verification")
    }
}


const userLoginService = async ({ username, password }) => {

    const user = await userModel.findOne({ username })
    if (!user) {
        throw new ApiError(401, "incorrect username or password")
    }

    // if (!user.isVerified) {
    //     throw new ApiError(403, "Your email address is not verified. Please check your inbox for the verification email ")
    // }

    const result = await user.isPasswordCorrect(password)
    if (!result) {
        throw new ApiError(401, "incorrect username or password")
    }

    const loggedInUser = {
        id: user._id,
        username: user.username,
        email: user.email
    } 

    const { accessToken, refreshToken } = await generateRefreshAndAccessToken(user)

    return { loggedInUser, accessToken, refreshToken };



}

const userLogoutService = async (userId) => {
    await userModel.findByIdAndUpdate(
        userId,
        { $unset: { refreshToken: 1 } }, // cleanly removes the field vs setting to null
        { new: true }
    )
}
 

const refreshAccessTokenService = async (incomingRefreshToken) => {
    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_SECRET_KEY)

        const user = await userModel.findById(decodedToken._id)
        if (!user) {
            throw new ApiError(401, "invalid token")
        }

        const hashedIncomingToken = crypto.createHash("sha256").update(incomingRefreshToken).digest("hex")

        if (hashedIncomingToken !== user?.refreshToken) {
            throw new ApiError(401, "refresh token is expired or used")
        }

       
        const { accessToken, refreshToken: newRefreshToken } = await generateRefreshAndAccessToken(user)

        return { accessToken, newRefreshToken }

    } catch (error) {
        console.log("error in generating new access&refresh token:", error)
        throw new ApiError(401, error?.message || "something went wrong while generating new access token")
    }
}



export { userRegisterService, userLoginService,userLogoutService, GenerateVerificationEmailService, userEmailVerificationService, refreshAccessTokenService }