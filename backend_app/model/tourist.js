const mongoose = require("mongoose");

const touristSchema = new mongoose.Schema({
  name: { type: String, default: null },
  camera: { type: String, default: null },
  datetime: { type: String, default: null },
  totalCountIn: { type: Number, default: 0 },
  totalCountOut: { type: Number, default: 0 },
});

module.exports = mongoose.model("tourist", touristSchema);
