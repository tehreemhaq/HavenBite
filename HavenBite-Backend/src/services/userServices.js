import crypto from "node:crypto";

import { userModel } from "../models/userModel.js";
import { ApiError } from "../helpers/ApiErrors.js";
import {
  generateRefreshAndAccessToken,
  generateEmailVerificationToken,
} from "../helpers/generateToken.js";
import { sendEmail } from "../helpers/emailSender.js";
import{newEmailVerificationSender} from "../helpers/newEmailVerificationSender.js"
import { resetPasswordEmailSender } from "../helpers/resetPasswordEmailSender.js";

const userRegisterService = async ({ username, email, password }) => {
  const userExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (userExists) {
    throw new ApiError(409, "user already exists");
  }

  const user = await userModel.create({ username, email, password });
  console.log("created user : ", user);

  return user;
};

const GenerateVerificationEmailService = async (user) => {
  const verificationToken = await generateEmailVerificationToken(user);

  const data = await sendEmail({
    // to: user.email,
    username: user.username,
    verificationToken,
  });
  console.log("returned data from sending email :", data);
};

const userEmailVerificationService = async (hashedReceivedToken) => {
  try {
    const userWithVerificationToken = await userModel.findOne({
      emailVerificationToken: hashedReceivedToken,
      emailVerificationExpiry: { $gt: Date.now() },
    });
    if (!userWithVerificationToken) {
      throw new ApiError(401, "invalid or expired token");
    }

    if (userWithVerificationToken.isVerified) {
      throw new ApiError(
        200,
        "your account has already been successfully verified",
      );
    }

    const userAfterVerification = await userModel.findOneAndUpdate(
      { _id: userWithVerificationToken._id },
      {
        $set: {
          emailVerificationToken: "",
          emailVerificationExpiry: "",
          isVerified: true,
        },
      },
      { new: true },
    );
    console.log("user after verification : ", userAfterVerification);
  } catch (error) {
    console.log("error in email verification service :", error);
    throw new ApiError(500, "something went wrong while email verification");
  }
};

const userLoginService = async ({ username, password }) => {
  const user = await userModel.findOne({ username });
  if (!user) {
    throw new ApiError(401, "incorrect username or password");
  }

  if (!user.isVerified) {
      throw new ApiError(403, "Your email address is not verified. Please check your inbox for the verification email ")
  }

  const result = await user.isPasswordCorrect(password);
  if (!result) {
    throw new ApiError(401, "incorrect username or password");
  }

  const loggedInUser = {
    id: user._id,
    username: user.username,
    email: user.email,
  };

  const { accessToken, refreshToken } =
    await generateRefreshAndAccessToken(user);

  return { loggedInUser, accessToken, refreshToken };
};

const userLogoutService = async (userId) => {
  await userModel.findByIdAndUpdate(
    userId,
    { $unset: { refreshToken: 1 } }, // cleanly removes the field vs setting to null
    { new: true },
  );
};

const refreshAccessTokenService = async (incomingRefreshToken) => {
  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_SECRET_KEY,
    );

    const user = await userModel.findById(decodedToken._id);
    if (!user) {
      throw new ApiError(401, "invalid token");
    }

    const hashedIncomingToken = crypto
      .createHash("sha256")
      .update(incomingRefreshToken)
      .digest("hex");

    if (hashedIncomingToken !== user?.refreshToken) {
      throw new ApiError(401, "refresh token is expired or used");
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await generateRefreshAndAccessToken(user);

    return { accessToken, newRefreshToken };
  } catch (error) {
    console.log("error in generating new access&refresh token:", error);
    throw new ApiError(
      401,
      error?.message ||
        "something went wrong while generating new access token",
    );
  }
};


const userUpdateProfileService = async ({ userId, username, email, currentPassword, newPassword }) => {
    const user = await userModel.findById(userId)
    if (!user) {
        throw new ApiError(404, 'User not found')
    }

    // --- Password change ---
    if (newPassword) {
        const isCurrentPasswordCorrect = await user.isPasswordCorrect(currentPassword)
        if (!isCurrentPasswordCorrect) {
            throw new ApiError(400, 'Current password is incorrect')
        }
        user.password = newPassword  // pre-save hook hashes it
    }

    // --- Username change ---
    if (username && username !== user.username) {
        const existingUsername = await userModel.findOne({ username })
        if (existingUsername) {
            throw new ApiError(409, 'Username is already taken')
        }
        user.username = username
    }

    // --- Email change: store as pending, send verification to new address ---
    let emailVerificationPending = false
    if (email && email !== user.email) {
        const existingEmail = await userModel.findOne({ email })
        if (existingEmail) {
            throw new ApiError(409, 'Email is already in use')
        }

        // Store new email as pending — don't overwrite current email yet
        user.pendingEmail = email

        // Reuse existing token generation + hashing pattern
        const verificationToken = await generateEmailVerificationToken(user)

        // Send verification to the NEW address
        await newEmailVerificationSender({
            // to: email,
            username: user.username,
            verificationToken,
        })

        emailVerificationPending = true
    }

    await user.save()

    const updatedUser = {
        id: user._id,
        username: user.username,
        email: user.email, // still old email until verified
    }

    return { updatedUser, emailVerificationPending }
}


const verifyNewEmailService = async (hashedReceivedToken) => {
    try {
        // Find user who has this token and it hasn't expired
        const user = await userModel.findOne({
            emailVerificationToken: hashedReceivedToken,
            emailVerificationExpiry: { $gt: Date.now() },
        })

        if (!user) {
            throw new ApiError(401, 'Invalid or expired token')
        }

        if (!user.pendingEmail) {
            throw new ApiError(400, 'No pending email change found')
        }
f
        // Move pendingEmail → email and clear token fields
        await userModel.findOneAndUpdate(
            { _id: user._id },
            {
                $set: {
                    email: user.pendingEmail,        // swap to new email
                    pendingEmail: undefined,         // clear pending
                    emailVerificationToken: '',
                    emailVerificationExpiry: '',
                },
            },
            { new: true }
        )
 
        console.log(`Email updated for user: ${user.username}`)
 
    } catch (error) {
        // Re-throw ApiErrors directly — don't swallow them into a generic 500
        if (error instanceof ApiError) throw error
        console.log('error in verifyNewEmailService:', error)
        throw new ApiError(500, 'Something went wrong while verifying email')
    }
}

const forgotPasswordService = async ({ email }) => {
    const user = await userModel.findOne({ email })
 
    // Security: don't reveal whether the email exists or not
    // We return success either way — prevents email enumeration attacks
    if (!user) return
 
    // Generate a plain random token (sent in email link)
    const resetToken = crypto.randomBytes(32).toString('hex')
 
    // Hash before storing in DB — same pattern as your emailVerificationToken
    const hashedToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex')
 
    // Store hashed token + 1 hour expiry
    user.passwordResetToken = hashedToken
    user.passwordResetExpiry = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
    await user.save({ validateBeforeSave: false })
 
    await resetPasswordEmailSender({
        to: user.email,
        username: user.username,
        resetToken, // plain token goes in the link
    })
}
 
// ─── Reset Password Service ──────────────────────────────────────────────────
// Validates the token, sets the new password, clears the reset fields
 
const resetPasswordService = async ({ token, newPassword }) => {
    // Hash the incoming token to compare with stored hash
    const hashedToken = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex')
 
    const user = await userModel.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpiry: { $gt: Date.now() },
    })
 
    if (!user) {
        throw new ApiError(400, 'Password reset link is invalid or has expired')
    }
 
    // Set new password — pre-save hook will hash it
    user.password = newPassword
    user.passwordResetToken = undefined
    user.passwordResetExpiry = undefined
    await user.save()
}

export {
  userRegisterService,
  userLoginService,
  userLogoutService,
  GenerateVerificationEmailService,
  userEmailVerificationService,
  refreshAccessTokenService,
  userUpdateProfileService,
  verifyNewEmailService,
  forgotPasswordService,
  resetPasswordService
};
