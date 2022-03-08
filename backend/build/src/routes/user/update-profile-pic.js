"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../../model/user.model");
const s3_image_upload_1 = __importDefault(require("../../utils/s3-image-upload"));
const uploadSingle = s3_image_upload_1.default.single('image');
const updateProfilePic = (req, res) => {
    // upload profile pic to s3
    uploadSingle(req, res, function (err) {
        if (err) {
            return res.json({
                success: false,
                errors: {
                    title: "Image Upload Error",
                    detail: err.message,
                    error: err,
                },
            });
        }
        let update = { photo: req.file.location };
        // update url in the document database
        user_model_1.UserModel.findByIdAndUpdate(req.user.id, update, { new: true })
            .then((user) => res.status(200).json({ success: true, user: user }))
            .catch((err) => res.status(400).json({ success: false, error: err }));
    });
};
exports.default = updateProfilePic;
//# sourceMappingURL=update-profile-pic.js.map