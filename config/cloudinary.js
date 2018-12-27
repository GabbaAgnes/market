const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');



cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

console.log(cloudinaryStorage)
var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'samples', // The name of the folder in cloudinary
  allowedFormats: ['jpg', 'png'],
  bytes: 200,
  transformation: [
        { width: 100, height: 100, crop: 'thumb', gravity: 'face' }
    ],
  filename: function (req, file, cb) {
    cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
  }
});

const uploadCloud = multer({ storage: storage });

module.exports = uploadCloud;