const express = require("express");
const router = express.Router();
const Project = require("../../models/Project.js");
const authMiddleware = require("../../utils/auth.js");

router.use(authMiddleware);

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

router.get("/", async (req, res) => {
  try {
    const getAllProjects = await Project.find({
      user: req.user._id,
    });
    if (getAllProjects) {
      res.status(201).json(getAllProjects);
    } else {
      return res.status(400).json("You don't have projects");
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to return all projects" });
  }
});
