const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const { CommunityPost } = require('../../models');
const { isLoggedIn } = require("../middlewares");

const router = express.Router();

router.get('/', (req, res) => {
  res.render('board/write-community');
});

/* uploads 폴더 */
try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

/* multer 기본 설정 */
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fieldSize: 5 * 1024 * 1024 },
});

/* 게시글 IMG CREATE */
router.post('/img', isLoggedIn, upload.single('img'), (req, res) => {
  console.log(req.file);
  res.json({ url: `/img/${req.file.filename}` });
});

/* 게시글 TEXT CREATE */
router.post("/", isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    await CommunityPost.create({
      title: req.body.title,
      content: req.body.content,
      img: req.body.url,
      UserId: req.user.id,
    });
    res.redirect("/community/page?offset=0&limit=5");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;