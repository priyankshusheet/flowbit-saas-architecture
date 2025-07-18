const express = require("express");
const Ticket = require("../models/Ticket");
const { verifyToken, isAdmin } = require("../middleware/auth");
const axios = require("axios");

const router = express.Router();

// Create ticket
router.post("/tickets", verifyToken, async (req, res) => {
  const { title, description } = req.body;
  const ticket = await Ticket.create({
    title,
    description,
    customerId: req.user.customerId,
    createdBy: req.user.id,
  });

  // Trigger n8n
  try {
    await axios.post("http://n8n:5678/webhook-test", {
      ticketId: ticket._id,
      customerId: ticket.customerId,
    });
  } catch (err) {
    console.log("Failed to call n8n:", err.message);
  }

  res.status(201).json(ticket);
});

// List all tickets for current tenant
router.get("/tickets", verifyToken, async (req, res) => {
  const tickets = await Ticket.find({ customerId: req.user.customerId });
  res.json(tickets);
});

// Webhook callback from n8n
router.post("/webhook/ticket-done", async (req, res) => {
  const secret = req.headers["x-secret"];
  if (secret !== "n8n-secret") return res.status(401).send("Unauthorized");

  const { ticketId } = req.body;
  await Ticket.findByIdAndUpdate(ticketId, { status: "done" });
  res.send("Ticket updated");
});

module.exports = router;
