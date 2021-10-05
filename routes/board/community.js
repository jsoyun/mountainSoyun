const express = require('express');
const router = express.Router();
const { CommunityPost, User } = require('../../models');

/* 커뮤니티 목록 */
router.get('/', async (req, res, next) => {
  try {
    const posts = await CommunityPost.findAll({
      include: { 
        model: User,
        attribute: ['id', 'nick'],
      },
      order: [['createdAt', 'DESC']],
    });
    res.render('board/main-community', {
      title: 'mountain 커뮤니티',
      communityTwits: posts,
    });
  } catch (error) {
    console.error(error);
    next(error);
  };
});

module.exports = router;