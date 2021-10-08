const { next } = require("cheerio/lib/api/traversing");
const express = require("express");
const path = require("path");
const { Club, User, ClubComment } = require("../../models");
const { isLoggedIn } = require("../middlewares");

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followerIdList = [];
  next();
});

/* 피드 상세페이지 읽기 */
router.get("/", async (req, res, next) => {
  try {
    const uploads = await Club.findAll({
      include: {
        model: User,
        attributes: ["id", "nick"],
      },
      order: [["createdAt", "DESC"]],
    });
    // res.status(201).json(comments);
    res.render("club/clubdetail", {
      title: "feed detail",
      twits: uploads,
    });
    // res.status(201).json(req.body);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/comment", async (req, res, next) => {
  try {
    const coments = await ClubComment.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "nick"],
        },
        {
          model: Club,
          attributes: ["id", "userId"],
        },
      ],
    });
    res.json(coments);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/* 댓글 */
router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    // res.status(201).json(req.body);
    const comment = await ClubComment.create({
      clubId: req.body.clubId,
      writerId: req.user.id,
      comment: req.body.comment,
    });
    // res.location("/");
    res.redirect("/clubdetail");
    // res.send("success");
  } catch (err) {
    console.error(err);
    next(err);
  }
});


/* 마이페이지로에서 user가 본인 피드 삭제시 */
router.get("/:id/delete", async (req, res, next) => {
  console.log(req.body);
  try {
    await Club.destroy({ where: { id: `${req.params.id}` } });
    res.redirect("mypage/mypage");
  } catch (error) {
    console.error(err);
    next(err);
  }
});

// router.route('/:id)
// .get(async (req, res, next) => {
//   try {
//   const clubcomments = await ClubComment.findAll();
//   res.render('clubcomments', { title: '댓글', clubcomments });
// } catch (err) {
//   console.error(err);
//   next(err);
// })



// 수정시
// router.route("/:id").patch(async (req, res, next) => {
//   try {
//     const result = await Comment.update(
//       {
//         comment: req.body.comment,
//       },
//       {
//         where: { id: req.params.id },
//       }
//     );
//     res.json(result);
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// });
// router.get("/:id/comment", async (req, res, next) => {
//   try {
//     const users = await User.findAll({
//       include: {
//         model: User,
//         attributes: ["nick"],
//       },
//       order: [["createdAt", "DESC"]],
//     });
//     res.render("sequelize", { users });
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// });

module.exports = router;
