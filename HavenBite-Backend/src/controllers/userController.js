import crypto from "node:crypto"
import jwt from "jsonwebtoken"
import { asyncWrapper } from "../helpers/asyncWrapper.js"
import { ApiResponse } from "../helpers/ApiResponse.js"


import { userRegisterService, userLoginService, userLogoutService, GenerateVerificationEmailService, userEmailVerificationService, refreshAccessTokenService } from "../services/userServices.js"
import { userModel } from "../models/userModel.js"
import { ApiError } from "../helpers/ApiErrors.js"



const registerUser = asyncWrapper(async (req, res) => {
    const { username, email, password } = req.body

    const user = await userRegisterService({ username, email, password })
    // await  GenerateVerificationEmailService(user)


    return res.status(201).json(
        new ApiResponse(201, "user registered successfully. Please check you inbox for email verification")
    )
}

)

// this endpoint will check the token match it with hashed token in db and also if it is expired or not
// clearing that check it send response(email verified or redirecting to login something like that)
// change isVerified field to true and remove token and expiry after verification

const verifyEmail = asyncWrapper(async (req, res) => {
    const receivedToken = req.params.token
    if (!receivedToken) {
        throw new ApiError()
    }
    const hashedReceivedToken = crypto.createHash("sha256").update(receivedToken).digest("hex")
    await userEmailVerificationService(hashedReceivedToken)



    return res.json(new ApiResponse(200, "Email Verification successfull"))
})


const loginUser = asyncWrapper(async (req, res) => {
    const { username, password } = req.body

    const { loggedInUser, accessToken, refreshToken } = await userLoginService({ username, password })

    // const options = {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === "production",
    //     sameSite: process.env.NODE_ENV === "production" ? "strict" : "none",
    // }

    // in your login controller
    const options = {
        httpOnly: true,   // 👈 back to true
        secure: false,
        sameSite: "lax",
        path: "/",
    }


    return res
        .cookie("RefreshToken", refreshToken, options)
        .cookie("AccessToken", accessToken, options)
        .status(200)
        .json(new ApiResponse(200, { user: loggedInUser }, "user logged in successfully"))
}
)

const getCurrentUser = asyncWrapper(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200, { user: req.user }, "current user fetched"))
})

const logoutUser = asyncWrapper(async (req, res) => {
    await userLogoutService(req.user._id)

    const options = {
        httpOnly: true,   //  back to true
        secure: false,
        sameSite: "lax",
        path: "/",
    }

    return res
        .clearCookie("AccessToken", options)
        .clearCookie("RefreshToken", options)
        .status(200)
        .json(new ApiResponse(200, {}, "user logged out successfully"))

})

// for testing purpose only
const restrictedRoute = (req, res) => {
    res.status(200).json(new ApiResponse(200, "user authorized "))
}



const refreshAccessToken = asyncWrapper(async (req, res) => {
    const incomingRefreshToken = req.cookies?.RefreshToken 

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request")
    }

    const { accessToken, newRefreshToken } = await refreshAccessTokenService(incomingRefreshToken)

    const options = {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
    }

    return res
        .status(200)
        .cookie("AccessToken", accessToken, options)   
        .cookie("RefreshToken", newRefreshToken, options) 
        .json(new ApiResponse(200, {}, "access token refreshed successfully"))
})




export { registerUser, loginUser, getCurrentUser, logoutUser, verifyEmail, restrictedRoute, refreshAccessToken }