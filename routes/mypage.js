const express = require("express");
const router = express.Router();
const { User } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

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
router.get("/", async (req, res, next) => {
  try {
    console.log("id랑 닉네임?");
    const posts = await User.findAll({
      //include는 없으면 추가
      // include: {
      //   model: User,
      //   attributes: ["id", "nick"],
      // },
      order: [["createdAt", "DESC"]],
    });
    res.render("mypage/mypage", {
      title: "NodeBird",
      twits: posts,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

//profile 페이지
router.get("/mypage", (req, res) => {
  res.render("mypage/mypage", { title: "내 정보-NodeBird" });
});

//join페이지 로그인 한 페이지인가?
router.get("/login", (req, res) => {
  res.render("login/login", { title: "회원가입-NodeBird" });
});

/* GET page. */
router.get("/", (req, res) => {
  res.render("mypage/mypage", { title: "내 정보" });
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
    return res.render("mypage/mypage", {
      title: `${query}| mountaindb`,
      twits: posts,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;
