const express = require("express");
const { postTaskToUserId , getTasks ,getTasksByUserId ,updateTasksForUserId , deleteTaskById} = require("../Controllers/task.js");
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
// router.put(":userId/tasks/:taskId" , deleteTaskById);
router.delete("/:userId/tasks/:taskId" , async (req,res) => {
  try {
    const { userId , taskId } = req.params;
    console.log(userId , taskId)
    let deletableTask = await Task.find({taskId});
    console.log(deletableTask)
     res.json({data : "at tasks update post route" , "taskID" : taskId, "userId" : userId})

    // res.json({ data : "at tasks delete route" ,"taskId" : "taskID"})

  }
  catch(err){
    res.json({"isSuccess" : false, err})
  }
})
module.exports = router;
