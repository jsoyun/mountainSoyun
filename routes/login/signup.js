const express = require("express");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const { User } = require("../../models");
const bcrypt = require("bcrypt");
const { isNotLoggedIn } = require("../middlewares");

const router = express.Router();

/* uploads 폴더 */
try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

router.get("/", (req, res, next) => {
  res.render("login/signup", { title: "회원가입" });
});

router.post("/", isNotLoggedIn, async (req, res, next) => {
  const { nick, email, pwd, pwdcheck } = req.body;
  let { url } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });

    if (exUser) {
      return res.send("<script>alert('이미 가입한 이메일 입니다.'); location.href='/signup';</script>");
    }
    if (pwd != pwdcheck) {
      return res.send("<script>alert('비밀번호를 확인해주세요.'); location.href='/signup';</script>");
    }

    const hash = await bcrypt.hash(pwd, 12);
    if (url == false) {
      console.log(1);
      url = '/img/basic.png';
    }
    User.create({
      nick,
      email,
      password: hash,
      img: url,
    });
    return res.redirect("/login");
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

/* 프로필 IMG CREATE */
router.post("/img", upload.single("img"), (req, res) => {
  console.log(req.file);

  res.json({ url: `/img/${req.file.filename}` });
});

module.exports = router;
