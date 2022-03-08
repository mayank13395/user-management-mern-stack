
import express from 'express';
import authenticate from '../../middleware/authentication';
import { validateLoginReq, validateRegisterReq } from '../../utils/user-validator';
import getUser from './get-user';
import login from './login';
import registerUser from './register';
import updateProfilePic from './update-profile-pic';
import updateUserProfile from './update-user-info';
export const userRouters = express.Router();

const { check } = require('express-validator')
// user routes

// @route POST /register
// @desc  register user
// @access Public
userRouters.post('/register',
    validateRegisterReq,
    registerUser
)

// @route POST /login
// @desc  login user
// @access Public
userRouters.post('/login', validateLoginReq, login);

// @route GET /user-details
// @desc  login user
// @access Private
userRouters.get('/user-details', authenticate, getUser);

// @route POST /update
// @desc  update user
// @access Private
userRouters.post('/update-user-info', authenticate, updateUserProfile);

// @route POST /update-profile-pic
// @desc  update user profile pic
// @access Private
userRouters.post('/update-profile-pic', authenticate, updateProfilePic);


