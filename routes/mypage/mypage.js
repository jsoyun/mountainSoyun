const express = require("express");
const { User, Club } = require("../../models");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.followerCount = req.user ? req.user.Followers.length : 0;
  res.locals.followingCount = req.user ? req.user.Followings.length : 0;
  res.locals.followerIdList = req.user ? req.user.Followings.map(f => f.id) : [];
  next();
});

//profile 페이지
router.get("/", (req, res) => {
  res.render("mypage/mypage", { title: "내 정보-NodeBird" });
});

//join페이지 로그인 한 페이지인가?
router.get("/login", (req, res) => {
  res.render("login/login", { title: "회원가입-NodeBird" });
});

router.get("/", (req, res) => {
  res.render("mypage", { title: "내 정보-NodeBird" });
});

module.exports = router;