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

// router.get("/", async (req, res, next) => {
//   try {
//     const uploads = await Club.findAll({
//       include: [
//         {
//           model: Post,
//           attributes: ["id", "nick"],
//           as: "Post"
//         },
//         {
//           model: User,
//           attributes: ["id", "nick"],
//           as: "Liker",
//         },
//       ],
//       order: [["createdAt", "DESC"]],
//     }).then((clubs) => {
//       console.log(clubs);
//       res.render("club", {
//         title: "mountain",
//         twits: uploads,
//         user: req.user,
//         // loginError: req.flash('loginError'),
//       });
//     });
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// });

router.get("/", async (req, res, next) => {
  try {
    const clubs = await Club.findAll({
      include: {
        model: User,
        attribute: ['id', 'nick'],
      },
      order: [['createdAt', 'DESC']],
    });
    res.render('club/club', {
      title: 'mountain feed',
      twits: clubs,
    });
  } catch (error) {
    console.error(error);
    next(error);
  };
});

// router.delete("/:id/like", async (req, res, next) => {
//   try {
//     const club = await Club.find({ where: { id: req.params.id } });
//     await club.removeLiker(req.user.id);
//     res.send("OK");
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });

// router.get('/', (req, res) => {
//   res.render('club');
// });

module.exports = router;
