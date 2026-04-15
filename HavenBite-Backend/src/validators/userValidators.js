import joi from 'joi'


const userRegistrationSchema = joi.object().keys({
    // username
    // email
    // password

    username: joi.string()
        .trim()
        .lowercase()
        .min(5)
        .max(15)
        .required()
        .pattern(new RegExp('^[a-zA-Z0-9_]{5,15}$'))
        .messages({
            'string.min': 'username must be at least 5 characters long',
            'string.max': "username cannot exceed 15 characters",
            'any.required': 'username is a required field',
            'string.pattern.base': 'Username can only contain letters, numbers, and underscores, and must be 5-15 characters long'
        }),

    email: joi.string()
        .trim()
        .email()
        .lowercase()
        .required()
        .messages({
            'string.email': 'invalid email format',
            'any.required': 'email is a required field'
        }),

    password: joi.string()
        .trim()
        .min(8)
        .max(30)
        .required()
        .pattern(new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
        .messages({
            'string.min': 'Password must be at least 8 characters long',
            'string.max': 'Password cannot exceed 30 characters',
            'any.required': 'Password is a required field',
            'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*)'
        }),
}).options({ abortEarly: false }).unknown(false)




const userLoginSchema = joi.object().keys({
    username: joi.string()
        .trim()
        .required()
        .messages({
            'any.required': 'username is a required field'

        }),
    password: joi.string()
        .trim()
        .required()
        .messages({
            'any.required': 'password is a required field'

        })

})



const userUpdateProfileSchema = joi.object().keys({
    username: joi.string()
        .trim()
        .lowercase()
        .min(5)
        .max(15)
        .pattern(new RegExp('^[a-zA-Z0-9_]{5,15}$'))
        .messages({
            'string.min': 'Username must be at least 5 characters long',
            'string.max': 'Username cannot exceed 15 characters',
            'string.pattern.base': 'Username can only contain letters, numbers, and underscores, and must be 5-15 characters long'
        }),

    email: joi.string()
        .trim()
        .email()
        .lowercase()
        .messages({
            'string.email': 'Invalid email format',
        }),

    currentPassword: joi.string()
        .trim()
        .when('newPassword', {
            is: joi.exist(),
            then: joi.required(),
            otherwise: joi.optional()
        })
        .messages({
            'any.required': 'Current password is required to set a new password'
        }),

    newPassword: joi.string()
        .trim()
        .min(8)
        .max(30)
        .pattern(new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
        .optional()
        .messages({
            'string.min': 'Password must be at least 8 characters long',
            'string.max': 'Password cannot exceed 30 characters',
            'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*)'
        }),

    confirmNew: joi.string()
        .trim()
        .valid(joi.ref('newPassword'))
        .when('newPassword', {
            is: joi.exist(),
            then: joi.required(),
            otherwise: joi.optional()
        })
        .messages({
            'any.only': 'Passwords do not match',
            'any.required': 'Please confirm your new password'
        }),

}).options({ abortEarly: false }).unknown(false)


// POST /user/forgot-password — just needs an email
const forgotPasswordSchema = joi.object().keys({
    email: joi.string()
        .trim()
        .email()
        .lowercase()
        .required()
        .messages({
            'string.email': 'Invalid email format',
            'any.required': 'Email is required'
        }),
}).options({ abortEarly: false }).unknown(false)
 
// POST /user/reset-password/:token — new password + confirm
const resetPasswordSchema = joi.object().keys({
    newPassword: joi.string()
        .trim()
        .min(8)
        .max(30)
        .required()
        .pattern(new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
        .messages({
            'string.min': 'Password must be at least 8 characters long',
            'string.max': 'Password cannot exceed 30 characters',
            'any.required': 'New password is required',
            'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*)'
        }),
    confirmPassword: joi.string()
        .trim()
        .valid(joi.ref('newPassword'))
        .required()
        .messages({
            'any.only': 'Passwords do not match',
            'any.required': 'Please confirm your new password'
        }),
}).options({ abortEarly: false }).unknown(false)




export { userRegistrationSchema, userLoginSchema ,userUpdateProfileSchema , forgotPasswordSchema , resetPasswordSchema }