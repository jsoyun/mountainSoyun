const express = require("express");
// const { Post, User } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { Post, User, Hashtag } = require("../models");
const router = express.Router();
router.use((req, res, next) => {
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
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ["id", "nick"],
      },
      order: [["createdAt", "DESC"]],
    });
    res.render("main", {
      title: "NodeBird",
      twits: posts,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

//profile 페이지
router.get("/profile", (req, res) => {
  res.render("profile", { title: "내 정보-NodeBird" });
});
//join페이지
router.get("/join", (req, res) => {
  res.render("join", { title: "회원가입-NodeBird" });
});

router.get("/hashtag", async (req, res, next) => {
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
      title: `${query}|NodeBird`,
      twits: posts,
    });
  } catch (error) {
    console.error(error);
    console.error(error);
    return next(error);
  }
});

module.exports = router;

//먼저 데이터 베이스에서 게시글을 조회한 뒤 결과를 twits에 넣어 렌더링
//조회할 때 게시글 작성자의 아이디와 닉네임을 JOIN해서 제공하고 , 게시글의 순서는 최신순으로 정렬
