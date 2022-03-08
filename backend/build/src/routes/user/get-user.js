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
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../../model/user.model");
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield user_model_1.UserModel.findById(req.user.id);
        // .select('-password');
        if (!user) {
            return res.status(400).json({ error: [{ msg: 'Access denied!' }] });
        }
        res.status(200).json({ user: user });
    }
    catch (error) {
        res.status(500).send('Sever error!');
    }
});
exports.default = getUser;
//# sourceMappingURL=get-user.js.map