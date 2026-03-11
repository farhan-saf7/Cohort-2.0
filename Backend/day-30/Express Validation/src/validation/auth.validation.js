import { body, validationResult } from "express-validator"

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }

    res.status(400).json({
        errors: errors.array()
    })
}


export const registerValidation = [
    body("username").isString().withMessage("username should be string"),
    body("email").isEmail().withMessage("email should be valid"),
    body("password").custom((value)=>{
        if(value.length < 6){
            throw new Error("password should at least 6 characters long")
        }
        const passwordRegex = /^(?=,*[A-Z])/
        if(!passwordRegex.test(value)){
            throw new Error("password should conatin at least one uppercase")
        }
        return true
    }).withMessage("password should be 6 characters long"),
    // body("userId").isMongoId(),
    validate

]