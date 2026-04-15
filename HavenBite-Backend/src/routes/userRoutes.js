import express from 'express'
const router = express.Router();


import {registerUser , loginUser , getCurrentUser,logoutUser, verifyEmail , restrictedRoute , refreshAccessToken , updateUserProfile,verifyNewEmail ,forgotPassword , resetPassword} from '../controllers/userController.js'
import { validate } from '../middlewares/validationMiddleware.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import {userRegistrationSchema , userLoginSchema , userUpdateProfileSchema , forgotPasswordSchema , resetPasswordSchema} from '../validators/userValidators.js'


router.use((req, res, next) => {
  console.log("incoming request:", req.method, req.path)
  next()
})

router.route('/register').post(validate(userRegistrationSchema ,'body'),registerUser)
router.route('/login').post(validate(userLoginSchema , 'body') , loginUser )
router.route('/logout').post( authMiddleware , logoutUser)
router.route('/verify-email/:token').get(verifyEmail)
router.route("/refresh-token").get(refreshAccessToken)
router.get("/me", authMiddleware, getCurrentUser)
router.route('/update-profile').put(authMiddleware, validate(userUpdateProfileSchema, 'body'), updateUserProfile)
router.route('/verify-new-email/:token').get(verifyNewEmail)
router.route('/forgot-password').post(validate(forgotPasswordSchema, 'body'), forgotPassword)          // <-- new
router.route('/reset-password/:token').post(validate(resetPasswordSchema, 'body'), resetPassword)      // <-- new
// cookie persistence issue
router.route('/restricted-route').get( authMiddleware ,restrictedRoute)

 



 




export default router