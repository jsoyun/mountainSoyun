const express = require("express");
const { isLoggedIn } = require("./middlewares");
const User = require("../models/user");
const { replaceWith } = require("cheerio/lib/api/manipulation");

const router = express.Router();

// router.get("/", isLoggedIn, (req, res, next) => {
//   console.log("버튼 반응이 있니?");
//   res.render("mypage");
// });

router.post("/:id/follow", isLoggedIn, async (req, res, next) => {
  console.log("여기로 넘어오나?");
  try {
    const user = await User.findOne({ where: { id: req.user.id } }); //아이디갖고오기
    if (user) {
      await user.addFollowing(parseInt(req.params.id, 10));
      res.send("success");
    } else {
      res.status(404).send("no user");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});
// //팔로우 끊기
// router.post("/:id/notfollow", isLoggedIn, async (req, res, next) => {
//   try {
//     const user = await User.findOne({ where: { id: req.params.id } });
//     if (user) {
//       await User.removeFollower(parseInt(req.user.id));
//       res.send("success");
//     }
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
