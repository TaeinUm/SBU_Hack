const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const Receipt = require('../models/Receipt'); // Adjust the path as necessary


// Configure AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

// Set up multer to upload the image to S3
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        acl: 'public-read', // adjust this according to your needs
        key: function (req, file, cb) {
            cb(null, Date.now().toString()); // Use Date.now() to name the file uniquely
        }
    })
}).single('img'); // 'img' is the name of the file input field

// Upload image to S3 and save the reference in MongoDB
exports.uploadReceipt = (req, res) => {
    upload(req, res, function (error) {
        if (error) {
            return res.status(500).json({ message: error.message });
        }
        // File uploaded successfully
        const newReceipt = new Receipt({
            img: req.file.location // req.file.location contains the URL of the file in S3
        });

        newReceipt.save()
            .then(receipt => res.status(201).json(receipt))
            .catch(err => res.status(400).json({ message: err.message }));
    });
};
