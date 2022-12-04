const express = require("express");
const { signupHandler, loginHandler } = require("../Controllers/user.js");
const router = express.Router();
router.post("/signup", signupHandler);
router.get("/signup", (req, res) => {
  res.json({ data: "at signup get route" });
});
router.post("/login", loginHandler);
router.get("/login", (req, res) => {
  res.json({ data: "at login get route" });
});
module.exports = router;
