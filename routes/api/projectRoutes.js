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
    res.status(201).json(newProject);
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
    if (getAllProjects) {
      res.status(201).json(getAllProjects);
    }
    return res.status(400).json("You don't have projects");
  } catch (error) {
    res.status(500).json({ message: "Failed to return all projects" });
  }
});

//get project by id

router.get("/:id", async (req, res) => {
  try {
    const getProjectById = await Project.findById(req.user._id);
    if (!getProjectById) {
      res.status(403).json({ message: "Can't get project" });
    }
    return res.status(201).json(getProjectById);
  } catch (error) {
    res.status(500).json({ message: "Failed to get project", error });
  }
});

//update  a project
router.put("/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    });
    if (!project) {
      res.status(404).json({ message: "Book not find" });
    }
    return res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Failed to update project" });
  }
});
