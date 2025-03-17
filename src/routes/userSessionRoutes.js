const express = require("express");
const { loginUser, logoutUser } = require("../controllers/userSessionController");
const router = express.Router();

router.post("/login", loginUser);
router.post("/logout", logoutUser);

module.exports = router;
