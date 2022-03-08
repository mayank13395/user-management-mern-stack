"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const s3 = new aws_sdk_1.default.S3({
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: process.env.AWS_REGION
});
// aws.config.update({
//     secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     region: process.env.AWS_REGION,
// });
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    }
    else {
        cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
    }
};
const uploadToS3 = (0, multer_1.default)({
    fileFilter,
    storage: (0, multer_s3_1.default)({
        acl: "public-read",
        s3,
        bucket: process.env.AWS_BUCKET_NAME,
        // metadata: function (req, file, cb) {
        //     cb(null, { fieldName: file.fieldName });
        // },
        key: function (req, file, cb) {
            cb(null, Date.now().toString());
        },
    }),
});
exports.default = uploadToS3;
//# sourceMappingURL=s3-image-upload.js.map