const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { alreadyLoggedIn } = require("../middleware/authMiddleware");

router.get("/signup", alreadyLoggedIn, authController.signup_get);

router.post("/signup", alreadyLoggedIn, authController.signup_post);

router.get("/login", alreadyLoggedIn, authController.login_get);

router.post("/login", alreadyLoggedIn, authController.login_post);

router.get("/logout", authController.logout_get);

router.get("/verify", authController.verify)

module.exports = router;

