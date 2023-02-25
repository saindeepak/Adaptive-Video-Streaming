const express = require("express");
const router = express.Router();
const controller = require("../controllers/videoUploadController");
const { upload } = require("../middlewares/videoUploadMiddleware");

router.get("/upload", controller.upload_get);

router.post("/upload", upload.single("video"), controller.upload_post);

module.exports = router;
