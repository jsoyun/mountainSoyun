const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const { CommunityPost, Hashtag } = require('../models');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('write-community');
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
    destination(req, file, done) {
      done(null, 'uploads/');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fieldSize: 5 * 1024 * 1024 },
});

/* 게시글 제목 */
// router.post('/title', upload.single('title'), (req, res) => {
//   console.log(req);
//   res.json({ url: `/img/${req.file.filename}` });
// });

/* 게시글 */
// router.post('/', upload.none(), async (req, res, next) => {
//   try {
//     console.log(req.user);
//     const post = await CommunityPost.create({
//       content: req.body.content,
//       img: req.body.url,
//       UserId: req.user.id,
//     });
//     console.log(post);
//     // res.redirect('/community');
//   } catch (error) {
//     console.error(error);
//     next(error);
//   };
// });

/* 이미지 */
router.post('/img', upload.single('img'), (req, res) => {
  console.log(req.file);
  res.json({ url: `/img/${req.file.filename}` });
});

router.post("/", upload.none(), async (req, res, next) => {
  try {
    // const mContent = 
    await CommunityPost.create({
      title: req.body.title,
      content: req.body.content,
      img: req.body.url,
      UserId: req.user.id,
    });
    console.log(mContent);
    // res.redirect("/community");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;