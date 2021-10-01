const express = require('express');
const router = express.Router();
const { Post, User } = require('../models');

router.use((req, res, next) => {
  // req.locals.user = req.user;
  next();
});

/* 커뮤니티 메인 */
router.get('/', async (req, res, next) => {
    try {
      const posts = await Post.findAll({
        include: {
          model: User,
          attribute: ['id', 'nick'],
        },
        order: [['createAt', 'DESC']],
      });
      res.render('main-community', { 
        title: 'mountain 커뮤니티',
        twits: posts,
     });
    } catch (error) {
      console.error(error);
      next(error);
    }
});

module.exports = router;