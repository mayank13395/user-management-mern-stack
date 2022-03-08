"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = __importDefault(require("./src"));
const logger_1 = __importDefault(require("./src/logger"));
const port = process.env.PORT || 8081;
src_1.default.listen(port, () => {
    logger_1.default.info(`server started on port ${port}`);
});
//# sourceMappingURL=server.js.map