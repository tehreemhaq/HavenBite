import joi from "joi";
import { ApiError } from "../helpers/ApiErrors.js";




function validate(Schema , Property) {

    return  (req, res, next) => {
        
            const { value, error } = Schema.validate(req[Property])
            if (error) {
                const errorDetails = error.details 
                const errorMessages = errorDetails.map((detail) => {
                    return detail.message
                })

                console.log(errorMessages)
                throw new ApiError(400, "Validation failed , try again .",errorMessages)
            }

            req[Property] = value

            next();
        }
    
}




export { validate }