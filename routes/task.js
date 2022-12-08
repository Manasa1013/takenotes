const express = require("express");
const { postTaskToUserId, getTasks, postTasks, getTasksByUserId, updateTasksForUserId, deleteTaskById } = require("../Controllers/task.js");
const { isAuthenticated } = require("../Controllers/auth.js")
const Task = require("../models/task");
const router = express.Router();

//sample get route
// router.get("/tasks", (req, res) => {
//   res.json({ data: "at tasks get route" });
// });
//sample post route
// router.post("/tasks", (req, res) => {
//   res.json({ data: "at tasks post route" });
// });
//demo routes
// router.get("/tasks", getTasks);
// router.post("/tasks", postTasks);
router.get("/:userId/tasks", isAuthenticated, getTasksByUserId)
router.post("/:userId/tasks", isAuthenticated, postTaskToUserId);


// router.post ("/:userId/tasks/:taskID" ,(req,res) => {
//   res.json({data : "at tasks update post route"})
// })
router.post("/:userId/tasks/:taskId", isAuthenticated, updateTasksForUserId);

router.delete("/:userId/tasks/:taskId", isAuthenticated, deleteTaskById);
module.exports = router;
