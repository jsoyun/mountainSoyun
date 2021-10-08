const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
const { Club, User, Hashtag } = require("../../models");
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

router.get('/hashtag', isLoggedIn, async (req, res, next) => {
  const query = req.query.hashtag;

  if(!query) {
    res.redirect('/');
  }
  try {
    const hashtag = await Hashtag.findOne({where: {title: query}});
    let posts = [];
    if(hashtag) {
      posts = await hashtag.getPosts({include: [{model: User}]});
    }
    return res.render('club/club', {
      title: `${query} | mountain`,
      twits: posts,
    });
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

module.exports = router;
