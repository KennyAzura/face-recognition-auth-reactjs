const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  identity: { type: String, default: null },
  area: { type: String, default: null },
  camera: { type: String, default: null },
  timestamp: { type: Date, default: new Date() },
  type: { type: String, default: null },
});

module.exports = mongoose.model("attendance_employees", attendanceSchema);
