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
const updateUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }
    const { firstName, lastName, email, password } = req.body;
    const profileObj = {
        user: req.user.id,
        firstName,
        lastName,
        email,
        password
    };
    try {
        // need to update
        let profile = yield user_model_1.UserModel.findByIdAndUpdate({ _id: req.user.id }, profileObj, { new: true });
        res.json(profile);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Sever error!');
    }
});
exports.default = updateUserProfile;
//# sourceMappingURL=update-user-info.js.map