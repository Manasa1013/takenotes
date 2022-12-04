const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  userId : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: 'String', required: [true, 'title required'] 
  },
  
  content: {
    type: 'String', required: [true, 'content required']
  },
  isArchived: { 
    type: Boolean, default: false 
  },
  isDeleted: {
    type: Boolean, default: false
  },
  isDone: { 
    type: Boolean, default: false 
  },
  background: {
    type: 'String', required: [true, 'background color required'] 
  },
}, { timestamps: true })



module.exports = mongoose.model("Task", taskSchema);