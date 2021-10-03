const express = require("express");
const { isLoggedIn } = require("./middlewares");
const User = require("../models/user");

const router = express.Router();

// router.get("/", isLoggedIn, (req, res, next) => {
//   console.log("버튼 반응이 있니?");
//   res.render("user");
// });

router.post("/:id/follow", isLoggedIn, async (req, res, next) => {
  console.log("여기로 넘어오나?");
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
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

module.exports = router;
