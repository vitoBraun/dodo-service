const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  email: { type: String, required: true, index: true },
  status: {
    type: String,
    required: true,
    enum: ["new", "work", "done", "closed"],
    default: "new",
  },
  executor: String,
  operatorsComment: String,
  engineersComment: String,
  created: { type: Date, default: Date.now },
  takenToWork: Date,
  completed: Date,
  description: String,
  branch: String,
  manager: String,
  faultIndex: Number,
  files: [],
  doneFiles: [],
  photoUrl: String,
  photoUrlWorkComplete: String,
});

module.exports = mongoose.model("Order", orderSchema);
