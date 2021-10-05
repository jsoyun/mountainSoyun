const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
const User = require("../../models/user");
const router = express.Router();

/* GET page. */

router.get("/", isLoggedIn, (req, res) => {
  console.log("로그아웃오니?");
  req.logout();
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
