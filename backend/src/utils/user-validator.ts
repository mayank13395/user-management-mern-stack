import { check } from "express-validator"

const validateEmail = check('email', 'Please include a valid email').isEmail()
const validateLogin = check('password', 'password cannot be empty ').not().isEmpty()
const validateFirstName = check('firstName', 'firstName is required').not().isEmpty()
const validateLastName = check('lastName', 'lastName is required').not().isEmpty()
const validatePassword = check('password', 'please enter a password with 6 or more character').isLength({
    min: 6
})

export const validateLoginReq = [
    validateEmail,
    validateLogin
]


export const validateRegisterReq = [
    validateFirstName,
    validateLastName,
    validateEmail,
    validatePassword
]
