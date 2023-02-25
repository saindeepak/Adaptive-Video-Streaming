const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
    console.log(file);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 50,
  },
});

module.exports = { upload };
