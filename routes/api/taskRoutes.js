const express = require("express");
const router = express.Router();
const Task = require("../../models/Task.js");
const Project = require("../../models//Project.js");
const authMiddleware = require("../../utils/auth.js");

router.use(authMiddleware);

//create new task for a specific project
router.post("/:projectId/tasks", async (req, res) => {});

//get all tasks for a specific project
router.get("/:projectId/tasks", async (req, res) => {});

//update a task
router.put("/:taskId", async (req, res) => {});

//delete a task
router.delete("/:taskId", async (req, res) => {});
