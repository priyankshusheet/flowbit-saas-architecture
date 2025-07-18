const express = require("express");
const router = express.Router();
const registry = require("../registry.json");
const authMiddleware = require("../middleware/auth");

router.get("/me/screens", authMiddleware, (req, res) => {
  const customerId = req.user.customerId;
  const screens = registry.filter((r) => r.tenant === customerId);
  res.json(screens);
});

module.exports = router;
