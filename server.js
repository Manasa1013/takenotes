const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { initializeDBConnection } = require("./connection.mongo");
const userRoutes = require("./routes/user");
const taskRoutes = require("./routes/task");
initializeDBConnection();


const app = express();

const port = process.env['PORT'] || 8082;

app.use(bodyParser.json());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
require("dotenv").config();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const crypto = require("crypto");

app.use(cors());
app.use("/", userRoutes);
app.use("/", taskRoutes);

app.get("/", (req, res) => {
  res.json({ "isSuccess": true, "message": "Notes application is now on" })
})

let tasks = [
  {
    id: 1670086655087,
    title: 'Adding crud from db',
    content: 'Working on making db and backend connection to frontend',
    background: '#000fff',
    isDone: false
  }
];



// app.get("/tasks", async (req, res) => {
//   try {

//     res.json({ "isSuccess": true, "check": "backend refreshing", "resultData": tasks })
//   }
//   catch (err) {
//     console.error(err, "at fetching result ")
//   }
// })
// app.post("/tasks", async (req, res) => {
//   try {
//     let taskToBeAdded = req.body;
//     console.log(taskToBeAdded);
//     tasks.unshift(taskToBeAdded);
//     res.json({ "isSuccess": true, response: tasks[0] });
//   } catch (err) {
//     res.json({ "isSuccess": false, error: err })
//   }
// })
app.listen(port, () => {
  console.log(`listening on ${port} port`);
  // console.log(require('crypto').randomBytes(256).toString('base64'));
});
