"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author Mayank Kumar
 * @description Server and REST API config
 */
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const logger_1 = __importDefault(require("./logger"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
(0, database_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((req, res, next) => {
    try {
        const xForwardedFor = (req.headers['x-forwarded-for'] || '').replace(/:\d+$/, '');
        const ip = xForwardedFor || req.connection.remoteAddress;
        logger_1.default.info(`IMP - API called path: ${req.path} method: ${req.method}, query: ${JSON.stringify(req.query)}, remote address (main/proxy ip):${ip}, reference: ${req.headers.referer} and user-agent: ${req.headers['user-agent']}`);
    }
    catch (error) {
        logger_1.default.error(`error while printing caller info path: ${req.path}`);
    }
    next();
});
app.use('/user', routes_1.userRouters);
exports.default = app;
//# sourceMappingURL=index.js.map