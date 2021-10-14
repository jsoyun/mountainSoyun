const express = require("express");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
// const nodemailer = require('nodemailer');
const { User } = require("../../models");
const bcrypt = require("bcrypt");
const { isNotLoggedIn } = require("../middlewares");
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');

const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("login/signup", { title: "회원가입" });
});

// uploads 폴더
try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads 폴더가 없어 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}

AWS.config.update({
  accessKeyId: process.env.S3_Access_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2',
});

/* multer 기본 설정 */
const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: 'wenode',
    key(req, file, cb) {
      cb(null, `original/${Date.now()}${path.basename(file.originalname)}`);
    },
  }),
  limits: { fieldSize: 5 * 1024 * 1024 },
});

/* 프로필 IMG CREATE */
router.post("/img", upload.single("img"), (req, res) => {
  console.log(req.file);

  res.json({ url: `/img/${req.file.location}` });
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
    console.log('이미지' + url);
    if (url == false) {
      console.log(1);
      url = '/img/basic.png';
    }
    console.log(url);
    User.create({
      nick,
      email,
      password: hash,
      img: url,
    });
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;
