const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
const { Club, User } = require("../../models");
const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.followerCount = req.user ? req.user.Followers.length : 0;
  res.locals.followingCount = req.user ? req.user.Followings.length : 0;
  res.locals.followerIdList = req.user ? req.user.Followings.map((f) => f.id) : [];
  next();
});

router.get("/", async (req, res, next) => {
  try {
    const clubs = await Club.findAll({
      include: {
        model: User,
        attribute: ["id", "nick"],
      },
      order: [["createdAt", "DESC"]],
    });
    res.render("club/club", {
      title: "mountain feed",
      twits: clubs,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
