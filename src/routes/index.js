const express = require("express");
const userRoutes = require("./userRoutes");
const authRoutes = require("./userSessionRoutes");

const router = express.Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);

module.exports = router;
