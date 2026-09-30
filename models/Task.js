const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, enum: ["To Do", "Progress", "Done"] },
  project: {
    type: mongoose.Schema.Types.ObjectId, //Stores a MongoDB ID
    ref: "Project", //That ID belongs to Project
    required: true,
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
