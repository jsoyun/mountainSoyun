//모듈
const express = require("express");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const { User } = require("../../models");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { isNotLoggedIn } = require("../middlewares");
const { body, validationResult } = require('express-validator');

//라우터
const router = express.Router();

const check = [
  body("nick", "이름을 적어주세요.").notEmpty().isLength({ min: 2, max: 7 }),
  body("email", "이메일란을 확인해주세요.").isEmail().notEmpty(),
];

const errorCheck = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(400).json(errors);
  }
  next();
}

//회원가입 창띄우기(get)
router.get("/", (req, res, next) => {
  res.render("login/signup", { title: "회원가입" });
});

router.post("/", isNotLoggedIn, check, errorCheck, async (req, res, next) => {
  const { email, nick, password, img } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.redirect("/signUp?error=exist");
    }
    const hash = await bcrypt.hash(password, 12);
    User.create({
      email,
      nick,
      password: hash,
      img: req.body.url,
    });
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// uploads 폴더
try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads 폴더가 없어 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}

/* multer 기본 설정 */
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fieldSize: 5 * 1024 * 1024 },
});

/* 게시글 IMG CREATE */
router.post("/img", upload.single("img"), (req, res) => {
  console.log(req.file);

  res.json({ url: `/img/${req.file.filename}` });
});

/* 게시글 TEXT CREATE */
router.post("/", upload.none(), async (req, res, next) => {
  try {
    await User.create({
      // nick: req.body.nick,
      img: req.body.url,
    });
    res.redirect("/signup");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//모듈 전체 라우터 사용하려고
module.exports = router;
