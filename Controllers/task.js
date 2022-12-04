const Task = require("../models/task");

const postTaskToUserId = async  (req, res) => {
  try {
    let addTask = req.body;
    let {userId } = req.params;
    console.log(addTask);
    const newTask = new Task({...addTask , "userId" : userId})
    await newTask.save();
    // tasks.unshift(taskToBeAdded);
    res.json({ "isSuccess": true, message: "task is saved to DB", response : newTask });
  } catch (err) {
    res.json({ "isSuccess": false, error: err })
  }
}


let tasks = [
  {
    id: 1670086655087,
    title: 'Adding crud from db',
    content: 'Working on making db and backend connection to frontend',
    background: '#000fff',
    isDone: false
  }
];

const getTasks = async (req,res) => {
  try {
    const response = await Task.find({});
    console.log(response,"at gettasks ")
    res.json({"response" :response})
  }
  catch (err) {
    console.error(err, "at fetching result ")
  }
}

const getTasksByUserId = async (req,res) => {
  const { userId } = req.params;
  try {
    const response = await Task.find({userId});
    console.log(response,"at gettasks by user id")
    res.json({"response" :response})
  }catch(err){
    console.error(err,"at fetchign tasks by user id");
    res.status(401).json({"isSuccess" : false, "message" : err})
  }
}
const updateTasksForUserId = async (req,res) => {
  const {userId , taskId} = req.params;
  const editTask = req.body ;
  try {
    
  const updateTasks = await Task.findOneAndUpdate({_id : taskId} , editTask)
  
  res.json({taskId , updateTasks});
  }
  catch(err){
    res.status(401).json({"error" : err,taskId, message : "update task failed"})
  }
}
const deleteTaskById = async (req,res) => {
  
  try {
      const { userId , taskId } = req.params;
      if(err) console.log(err)
    // const deleteTask = await Task.find(taskId);
    // res.json({message : "deleted a task"  })
  }
  catch(err){
    console.error(err,"error at delete")
    // res.status(400).json({"error" : err, taskId, message : "task couldn't be deleted"})
  }
}
module.exports = { postTaskToUserId , getTasks , getTasksByUserId,updateTasksForUserId , deleteTaskById};