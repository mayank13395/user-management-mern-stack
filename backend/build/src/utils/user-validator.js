"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegisterReq = exports.validateLoginReq = void 0;
const express_validator_1 = require("express-validator");
const validateEmail = (0, express_validator_1.check)('email', 'Please include a valid email').isEmail();
const validateLogin = (0, express_validator_1.check)('password', 'password cannot be empty ').not().isEmpty();
const validateFirstName = (0, express_validator_1.check)('firstName', 'firstName is required').not().isEmpty();
const validateLastName = (0, express_validator_1.check)('lastName', 'lastName is required').not().isEmpty();
const validatePassword = (0, express_validator_1.check)('password', 'please enter a password with 6 or more character').isLength({
    min: 6
});
exports.validateLoginReq = [
    validateEmail,
    validateLogin
];
exports.validateRegisterReq = [
    validateFirstName,
    validateLastName,
    validateEmail,
    validatePassword
];
//# sourceMappingURL=user-validator.js.map