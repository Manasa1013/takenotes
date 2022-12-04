const express = require("express");
const { postTaskToUserId ,getTasks,getTasksByUserId ,updateTasksForUserId,deleteTaskById } = require("../Controllers/task.js");
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
// router.get("/tasks" , getTasks);
router.get("/:userId/tasks" , getTasksByUserId)
router.post("/:userId/tasks" , postTaskToUserId);

// router.post ("/:userId/tasks/:taskID" ,(req,res) => {
//   res.json({data : "at tasks update post route"})
// })
router.post ("/:userId/tasks/:taskId" ,updateTasksForUserId);

router.delete("/:userId/tasks/:taskId" , deleteTaskById);
module.exports = router;
