const express = require("express");
const url = require("url");
const { Club, User, Hashtag } = require("../../models");
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

/* # 태그 검색 */
router.get("/hashtag", async (req, res, next) => {
  let queryData = url.parse(req.url, true).query;
  let search = queryData.hashtag;
  if (!search) {
    return res.redirect("/club");
  }
  try {
    const hashtags = await Hashtag.findOne({ where: { title: search } });
    let posts = [];
    if (hashtags) {
      posts = await hashtags.getClubs({
        include: [
          {
            model: User,
            attribute: ["id", "nick"],
          },
        ],
        order: [["id", "DESC"]],
      });
    }
    return res.render("club/club", {
      title: `mountain - ${search} 검색 결과`,
      twits: posts,
    });
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

module.exports = router;
