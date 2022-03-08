import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
const s3 = new aws.S3({
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: process.env.AWS_REGION
})

// aws.config.update({
//     secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     region: process.env.AWS_REGION,
// });

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
    }
};

const uploadToS3 = multer({
    fileFilter,
    storage: multerS3({
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

export default uploadToS3