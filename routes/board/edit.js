const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const { CommunityPost, User } = require('../../models');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

/* 게시글 수정 전 READ */
router.get('/:id', async (req, res, next) => {
  try {
    const editTexts = await CommunityPost.findOne({
      include: {
        model: User,
        attribute: ['id', 'nick'],
      },
      where: { id: `${req.params.id}` },
    });
    console.log(editTexts);
    res.render('board/edit-community', {
      title: 'mountain 커뮤니티 수정하기',
      communityTwits: editTexts,
    });
  } catch (error) {
    console.error(error);
    next(error);
  };
});

AWS.config.update({
  accessKeyId: process.env.S3_Access_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2',
});

/* 게시글의 이미지 업로드 수정하기 */
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

router.post('/:id/img', upload.single('img'), (req, res) => {
  console.log(req.file);
  res.json({ url: `/img/${req.file.location}` });
});

/* 게시글 UPDATE */
router.post('/:id', async (req, res, next) => {
  try {
    let img = req.body.img;
    if (req.body.url != false) {
      img = req.body.url;
    }
    await CommunityPost.update(
      {
        title: req.body.title,
        img,
        content: req.body.content
      },
      { where: { id: `${req.params.id}` } }
    );
    res.redirect("/community/page?offset=0&limit=5");
  } catch (error) {
    console.error(error);
    next(error);
  };
});

module.exports = router;