import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"




const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true
            
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            
        },
        refreshToken: {
            type: String ,   //  longterm token , will use it to refresh access token.
            
        },
        isVerified : {
              type: Boolean,
              default: false
        },
        emailVerificationToken: {
            type : String
        },
        emailVerificationExpiry :{
            type : Date,
            default : undefined
        }
    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function () {
    // hash the password before saving user instance  only if it is not modified otherwise move to next
    // need to learn about this way of writing if condition and block
    if (!this.isModified("password")) return
    this.password = await bcrypt.hash(this.password, 12)

})



userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)

}





userSchema.methods.generateRefreshToken = function () {

    return jwt.sign(
        {
            _id: this._id, //payload
        },
        process.env.REFRESH_SECRET_KEY,   //secret key
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY   // options {expiry}
        }
    )
 }



userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email
        },
        process.env.ACCESS_SECRET_KEY,
        {
            expiresIn: "1d"           //process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}








const userModel = mongoose.model("User", userSchema)


export { userModel }