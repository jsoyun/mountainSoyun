const express = require("express");
const { Club, User } = require("../../models");
const { isLoggedIn } = require('../middlewares');

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.like = req.user ? req.user.Likes.map(l => l.id) : [];
  res.locals.followerCount = req.user ? req.user.Followers.length : 0;
  res.locals.followingCount = req.user ? req.user.Followings.length : 0;
  res.locals.followerIdList = req.user ? req.user.Followings.map(f => f.id) : [];
  next();
});

router.get("/:id", isLoggedIn, async (req, res, next) => {
  try {
    const uploads = await Club.findAll({
      include: {
        model: User,
        attributes: ["id", "nick"],
      },
      order: [["createdAt", "DESC"]],
    });
    res.render("club/clubdetail", {
      title: "mountain - 도전 클럽",
      twits: uploads,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
