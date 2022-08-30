const multer = require("multer");

const fileUpload = multer({
  limits: 50000,
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "uploads");
    },
    filename: (req, file, callback) => {
      callback(null, file.originalname);
    },
  }),
});
module.exports = fileUpload;
