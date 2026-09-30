const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  user: {
    type: mongoose.Schema.Types.ObjectId, //Stores a MongoDB ID
    ref: "User", //That ID belongs to User
    required: true,
  },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
