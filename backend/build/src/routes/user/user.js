"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouters = void 0;
const express_1 = __importDefault(require("express"));
const authentication_1 = __importDefault(require("../../middleware/authentication"));
const user_validator_1 = require("../../utils/user-validator");
const get_user_1 = __importDefault(require("./get-user"));
const login_1 = __importDefault(require("./login"));
const register_1 = __importDefault(require("./register"));
const update_profile_pic_1 = __importDefault(require("./update-profile-pic"));
const update_user_info_1 = __importDefault(require("./update-user-info"));
exports.userRouters = express_1.default.Router();
const { check } = require('express-validator');
// user routes
// @route POST /register
// @desc  register user
// @access Public
exports.userRouters.post('/register', user_validator_1.validateRegisterReq, register_1.default);
// @route POST /login
// @desc  login user
// @access Public
exports.userRouters.post('/login', user_validator_1.validateLoginReq, login_1.default);
// @route GET /user-details
// @desc  login user
// @access Private
exports.userRouters.get('/user-details', authentication_1.default, get_user_1.default);
// @route POST /update
// @desc  update user
// @access Private
exports.userRouters.post('/update-user-info', authentication_1.default, update_user_info_1.default);
// @route POST /update-profile-pic
// @desc  update user profile pic
// @access Private
exports.userRouters.post('/update-profile-pic', authentication_1.default, update_profile_pic_1.default);
//# sourceMappingURL=user.js.map