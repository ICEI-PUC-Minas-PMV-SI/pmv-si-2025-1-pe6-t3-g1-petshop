const express = require("express");
const userRoutes = require("./userRoutes");
const authRoutes = require("./userSessionRoutes");
const scheduleRoutes = require("./scheduleRoutes");

const router = express.Router();

router.use("/", scheduleRoutes);
router.use("/users", userRoutes);
router.use("/", authRoutes);

module.exports = router;
