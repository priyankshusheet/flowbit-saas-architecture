const Ticket = require("../models/Ticket");

exports.createTicket = async (req, res) => {
  const { title, description } = req.body;
  const customerId = req.user.customerId;

  const ticket = new Ticket({
    title,
    description,
    customerId,
    status: "open",
  });

  await ticket.save();

  // Call n8n webhook here (optional for now)

  res.status(201).json(ticket);
};

exports.getTickets = async (req, res) => {
  const tickets = await Ticket.find({ customerId: req.user.customerId });
  res.json(tickets);
};

exports.markDoneFromWebhook = async (req, res) => {
  const { ticketId } = req.body;
  const secret = req.headers["x-secret-key"];
  if (secret !== process.env.N8N_SECRET) {
    return res.status(403).json({ message: "Invalid secret" });
  }

  await Ticket.findByIdAndUpdate(ticketId, { status: "done" });
  res.json({ message: "Updated" });
};
