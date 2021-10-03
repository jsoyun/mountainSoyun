const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { Club, User } = require("../models");
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

router.post("/:id/like", async (req, res, next) => {
  try {
    const post = await Post.find({ where: { id: req.params.id } });
    await post.addLiker(req.user.id);
    res.send("OK");
  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.delete("/:id/like", async (req, res, next) => {
  try {
    const post = await Post.find({ where: { id: req.params.id } });
    await post.removeLiker(req.user.id);
    res.send("OK");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
