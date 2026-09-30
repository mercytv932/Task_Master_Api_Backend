const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  ref: "User",
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
