const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: String,
  role: { type: String, enum: ["Admin", "User"], default: "User" },
  customerId: String
});

module.exports = mongoose.model("User", userSchema);