const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
const { Club, User } = require("../../models");
const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followerIdList = [];
  next();
});

/* GET page. */
// router.get("/", (req, res) => {
//   res.render("main/main", { title: "into the mountain" });
// });

router.get("/", async (req, res, next) => {
  try {
    const mains = await Club.findAll({
      include: {
        model: User,
        attribute: ["id", "nick"],
      },
      order: [["id", "DESC"]],
      limit: 6,
    });
    res.render("main/main", {
      title: "into the mountain",
      twits: mains,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
