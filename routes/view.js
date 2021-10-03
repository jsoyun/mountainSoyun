const express = require('express');
const router = express.Router();
const { CommunityPost, User } = require('../models');

/* 게시글 READ */
router.get('/:id', async (req, res, next) => {
  try {
    const texts = await CommunityPost.findOne({
      include: { 
        model: User,
        attribute: ['id', 'nick'],
      },
      where: { id: `${req.params.id}` },
    }) 
    console.log(texts);
    res.render('view-community', {
        title: 'mountain 커뮤니티',
        communityTwits: texts,
    });
    
  } catch (error) {
    console.error(error);
    next(error);
  };
});

module.exports = router;