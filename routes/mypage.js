const express = require("express");
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { Post, User, Hashtag } = require("../models");
router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.followerCount = req.user ? req.user.Followers.length : 0;
  res.locals.followingCount = req.user ? req.user.Followings.length : 0;
  res.locals.followerIdList = req.user
    ? req.user.Followings.map((f) => f.id)
    : [];
  next();
});

//profile 페이지
router.get("/mypage", (req, res) => {
  res.render("mypage", { title: "내 정보-NodeBird" });
});

//join페이지
router.get("/join", (req, res) => {
  res.render("join", { title: "회원가입-NodeBird" });
});

/* GET page. */
router.get("/", (req, res) => {
  res.render("mypage");
});

module.exports = router;
