const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { Post, User, Hashtag } = require("../models");

const router = express.Router();

router.use((req, res, next) => {
  console.log("얘가팔로우버튼효시하기위한page.js라는데..");
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

//join페이지 로그인 한 페이지인가?
router.get("/login", (req, res) => {
  res.render("login", { title: "회원가입-NodeBird" });
});

/* GET page. */
router.get("/", (req, res) => {
  res.render("mypage", { title: "내 정보" });
});

//
router.get("/communityhashtag", async (req, res, next) => {
  const query = req.query.hashtag;
  if (!query) {
    return res.redirect("/");
  }
  try {
    const hashtag = await Hashtag.findOne({ where: { title: query } });
    let posts = [];
    if (hashtag) {
      posts = await hashtag.getPosts({ include: [{ model: User }] });
    }
    return res.render("main", {
      title: `${query}| mountaindb`,
      twits: posts,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;
