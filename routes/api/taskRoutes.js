const express = require("express");
const router = express.Router();
const Task = require("../../models/Task.js");
const Project = require("../../models//Project.js");
const authMiddleware = require("../../utils/auth.js");

router.use(authMiddleware);

//create new task for a specific project
router.post("/:projectId/tasks", async (req, res) => {
  try {
    const { projectId } = req.params; //Take projectID from url and put in {projectId} variable.
    const project = await Project.findById(projectId);
    if (project.user.equals(req.user._id)) {
      const newTask = await Task.create({
        ...req.body, //takes the info
        project: projectId,
      });
      res.status(201).json(newTask);
    }
    return res.status(403).json({ message: "You don't own this project" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create new task", error });
  }
});

//get all tasks for a specific project
router.get("/:projectId/tasks", async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);
    if (project && project.user.equals(req.user._id)) {
      const getTasks = await Tasks.find({ project: projectId });
      return res.status(201).json(getTasks);
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to get all project's tasks" });
  }
});

//update a task
router.put("/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);
    const project = await Project.findById(task.project);
    if (project.user.equals(req.user._id)) {
      const updateTask = await Task.findByIdAndUpdate(taskId, req.body, {
        new: true,
      });
      return res.status(200).json(updateTask);
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update task" });
  }
});

//delete a task
router.delete("/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);
    const project = await Project.findById(task.project);
    if (project.user.equals(req.user._id)) {
      const deleteTask = await Task.findByIdAndDelete(taskId);
      res
        .status(200)
        .json({ message: "Task successfully deleted", task: deleteTask });
    }
    return res.status(403).json({ message: "You don't own this project" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task" });
  }
});
