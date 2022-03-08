"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// user schema
const UserSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    photo: String,
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: "updatedAt"
    }
});
UserSchema.methods.getAuthToken = function () {
    console.log("get token called--------");
    const { TOKEN_KEY } = process.env;
    const token = jsonwebtoken_1.default.sign({
        user: {
            id: this._id
        }
    }, TOKEN_KEY, { expiresIn: 360000000 });
    return token;
};
// Create and export user model
exports.UserModel = (0, mongoose_1.model)("User", UserSchema);
//# sourceMappingURL=user.model.js.map