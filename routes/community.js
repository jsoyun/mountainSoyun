const express = require('express');
const router = express.Router();
const { CommunityPost, User } = require('../models');

router.use((req, res, next) => {
  // req.locals.user = req.user;
  next();
});

/* 커뮤니티 메인 */
router.get('/', async (req, res, next) => {
  try {
    // const posts = await CommunityPost.findAll({
    //   include: {
    //     model: User,
    //     attribute: ['id', 'nick'],
    //   },
    //   order: [['createAt', 'DESC']],
    // });
    res.render('main-community', {
      title: 'mountain 커뮤니티',
      // twits: posts,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.post("/", (req, res, next) => {
  res.render('write-community', { title: "업로드" });
});

module.exports = router;