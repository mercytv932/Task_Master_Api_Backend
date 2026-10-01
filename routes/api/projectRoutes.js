const express = require("express");
const router = express.Router();
const Project = require("../../models/Project.js");
const authMiddleware = require("../../utils/auth.js");

router.use(authMiddleware);

//create project
router.post("/", async (req, res) => {
  try {
    const newProject = await Project.create({
      ...req.body,
      user: req.user._id,
    });
    return res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: "Failed to create project", error });
  }
});

//get all projects
router.get("/", async (req, res) => {
  try {
    const getAllProjects = await Project.find({
      user: req.user._id,
    });
    return res.status(200).json(getAllProjects);
  } catch (error) {
    res.status(500).json({ message: "Failed to return all projects" });
  }
});

//get project by id

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getProjectById = await Project.findById(id);
    if (getProjectById && getProjectById.user.equals(req.user._id)) {
      res.status(200).json(getProjectById);
    }
    return res.status(403).json({ message: "Couldn't get the project" });
  } catch (error) {
    res.status(500).json({ message: "Failed to get project", error });
  }
});

//update  a project
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (project && project.user.equals(req.user._id)) {
      const updatedProject = await Project.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(updatedProject);
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update project" });
  }
});

//delete a project
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (project && project.user.equals(req.user._id)) {
      await Project.findByIdAndDelete(id);

      return res
        .status(200)
        .json({ message: "Project successfully deleted 🎉" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete Project" });
  }
});

module.exports = router;
