const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/api/tickets", require("./tickets"));
router.use("/", require("./screens"));
router.use("/webhook", require("./webhook"));

module.exports = router;