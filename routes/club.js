const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { Club, User } = require("../models");
const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followerIdList = [];
  next();
});

/* GET page. */

router.get("/", async (req, res, next) => {
  try {
    const uploads = await Club.findAll({
      include: {
        model: User,
        attributes: ["id", "nick"],
      },
      order: [["createdAt", "DESC"]],
    });
    res.render("club", {
      title: "mountain",
      twits: uploads,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
