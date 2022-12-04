require("dotenv").config();
const mongoose = require("mongoose");

const DATABASE_URI = process.env['DATABASE_URI'];
async function initializeDBConnection() {
  try {
    await mongoose.connect(DATABASE_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    console.log("mongo db successfully connected");
  } catch (err) {
    console.error(err);
    console.error("mongodb couldn't connect");
  }
}
module.exports = { initializeDBConnection };
