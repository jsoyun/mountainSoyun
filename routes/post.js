const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs'); 

const { Post, Hashtag } = require('../models');

const router = express.Router();

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

/* 이미지 */
router.post('/img', upload.single('img'), (req, res) => {
    console.log(req.file);
    res.json({ url: `/img/${req.file.filename}` });
});

/* 게시글 */
router.post('/', upload.none(), async (req, res, next) => {
  try {
    console.log(req.user);
    const post = await Post.create({
      content: req.body.content,
      img: req.body.url,
      UserId: req.user.id,
    });
    res.redirect('/post');
  } catch (error) {
    console.error(error);
    next(error);
  };
});

module.exports = router;