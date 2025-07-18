const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, default: "open" },
  customerId: String,
  createdBy: String,
});

module.exports = mongoose.model("Ticket", ticketSchema);