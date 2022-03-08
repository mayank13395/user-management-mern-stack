"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = __importDefault(require("../../middleware/authentication"));
const user_validator_1 = require("../../utils/user-validator");
const get_user_1 = __importDefault(require("./get-user"));
const login_1 = __importDefault(require("./login"));
const register_1 = __importDefault(require("./register"));
const update_profile_pic_1 = __importDefault(require("./update-profile-pic"));
const update_user_info_1 = __importDefault(require("./update-user-info"));
const userRouters = express_1.default.Router();
// user routes
// @route POST /register
// @desc  register user
// @access Public
userRouters.post('/register', user_validator_1.validateRegisterReq, register_1.default);
// @route POST /login
// @desc  login user
// @access Public
userRouters.post('/login', user_validator_1.validateLoginReq, login_1.default);
// @route GET /user-details
// @desc  login user
// @access Private
userRouters.get('/user-details', authentication_1.default, get_user_1.default);
// @route POST /update
// @desc  update user
// @access Private
userRouters.post('/update-user-info', authentication_1.default, update_user_info_1.default);
// @route POST /update-profile-pic
// @desc  update user profile pic
// @access Private
userRouters.post('/update-profile-pic', authentication_1.default, update_profile_pic_1.default);
exports.default = userRouters;
//# sourceMappingURL=user.js.map