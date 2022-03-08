"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const user_model_1 = require("../../model/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const logger_1 = __importDefault(require("../../logger"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { firstName, lastName, email, password } = req.body;
    logger_1.default.debug(`req body:- ${req.body}`);
    try {
        // check if user exists
        let user = yield user_model_1.UserModel.findOne({ email });
        if (user) {
            return res.status(400).json({ error: [{ msg: 'user already exists' }] });
        }
        user = new user_model_1.UserModel({ firstName, lastName, email, password, photo: '' });
        // encrypt the password
        const salt = yield bcryptjs_1.default.genSalt(10);
        user.password = yield bcryptjs_1.default.hash(password, 10);
        // saving to database
        yield user.save();
        // send jwt 
        // Create token
        let token = user.getAuthToken();
        console.log("token", token);
        res.send({ token: token });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send('Sever error!');
    }
});
exports.default = registerUser;
//# sourceMappingURL=register.js.map