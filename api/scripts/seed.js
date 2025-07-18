const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const seed = async () => {
  await mongoose.connect("mongodb://localhost:27017/flowbit");

  const pw = await bcrypt.hash("admin123", 10);

  await User.deleteMany({});
  await User.create([
    {
      email: "logistics@admin.com",
      password: pw,
      role: "Admin",
      customerId: "logisticsco"
    },
    {
      email: "retail@admin.com",
      password: pw,
      role: "Admin",
      customerId: "retailgmbh"
    }
  ]);

  console.log("✅ Seeded users");
  process.exit();
};

seed();
