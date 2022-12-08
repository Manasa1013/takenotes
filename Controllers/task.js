const Task = require("../models/task");
const User = require("../models/user");

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

const postTasks = async (req,res) => {
  try {
    let addTask = req.body;
    const newTask = new Task({...addTask , "userId" : "638e4956b71204d373f83ad6"});
    //posting as user shraddha ,it's to test functionality
    await newTask.save();
    res.json({"isSuccess" : true, message : "task posted ", response : newTask});
    
  } catch(err) {
    res.json({"isSuccess" : false, "error" : err});
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
    // console.log(response,"at gettasks ")
    
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
    console.log(userId , taskId)
    try {
          // let deletableTask = await Task.find({_id : taskId});
          // console.log(deletableTask)
          await Task.deleteOne({_id : taskId});
          res.json({message : "deleted task" ,task_id : taskId})
    } catch (error) {
      console.error(error,"at finding the deletable task")
          res.json({ error ,message : "error at finding the deletable task"})
    }
  }
  catch(err){
    res.json({"isSuccess" : false, err});
  }
}

module.exports = { postTaskToUserId , getTasks , postTasks, getTasksByUserId,updateTasksForUserId  , deleteTaskById };