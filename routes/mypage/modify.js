const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");

const { User } = require("../../models");

const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("너니?");
  res.render("mypage/modify");
});

router.post("/", isLoggedIn, async (req, res, next) => {
  console.log("로그인됐을때수정되려나");
  const { email, nick, password } = req.body;
  try {
    if (nick && password) {
      const hash = await bcrypt.hash(password, 12);
      await User.update(
        {
          nick,
          password: hash,
        },
        {
          where: { email: email },
        }
      );
    } else if (nick) {
      await User.update(
        {
          nick,
        },
        {
          where: { email: email },
        }
      );
    } else if (password) {
      const hash = await bcrypt.hash(password, 12);
      await User.update(
        {
          password: hash,
        },
        {
          where: { email: email },
        }
      );
    }
    return res.redirect("/");
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

module.exports = router;
