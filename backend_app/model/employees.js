const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  fullName: { type: String, default: null },
  avatarUrl: { type: String, default: null },
  Sex: { type: String, default: null },
  dateBirth: { type: String, default: null },
  status: { type: String, default: null },
  phone: { type: String, default: null },
  email: { type: String, default: null },
});

module.exports = mongoose.model("employee", employeeSchema);
