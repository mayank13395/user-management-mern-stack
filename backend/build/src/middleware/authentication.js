"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = __importDefault(require("../logger"));
const { TOKEN_KEY } = process.env;
// authentication middleware
const authenticate = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    // console.log("token:-", JSON.stringify(token), req.headers["x-access-token"]);
    logger_1.default.debug(`token:-${JSON.stringify(token)}`);
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, TOKEN_KEY);
        req.user = decoded.user;
    }
    catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};
exports.default = authenticate;
//# sourceMappingURL=authentication.js.map