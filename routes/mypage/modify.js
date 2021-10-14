const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');

const { User } = require("../../models");

const router = express.Router();

/* 게시글 수정 전 READ */
router.get("/", (req, res, next) => {
  res.render("mypage/modify", { title: '개인정보 수정하기' });
});

/* uploads 폴더 */
try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
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

/* 개인정보 수정 */
router.post("/", isLoggedIn, async (req, res, next) => {
  const { email, nick, password, url } = req.body;
  let img = url;
  if (img == false) {
    img = req.user.img;
  }
  try {
    if (nick && password) {
      const hash = await bcrypt.hash(password, 12);
      await User.update(
        {
          nick,
          img,
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
          img,
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
          img,
        },
        {
          where: { email: email },
        }
      );
    } else if (img) {
      await User.update(
        {
          img,
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

/* 게시글 IMG CREATE */
router.post('/img', isLoggedIn, upload.single('img'), (req, res) => {
  console.log(req.file);
  res.json({ url: `/img/${req.file.location}` });
});

module.exports = router;
