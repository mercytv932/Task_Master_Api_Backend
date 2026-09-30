const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: "To Do" || "Progress" || "Done",
  ref: "user",
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
