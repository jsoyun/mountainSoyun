const express = require('express');
const router = express.Router();
const { CommunityPost, User } = require('../../models');

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
    const likes = CommunityPost.findAll({
      include: [{
        model: User,
        attributes: ['id', 'nick'],
      }, {
        model: User,
        attributes: ['id', 'nick'],
        as: 'Liker',
      }],
    })
    console.log(likes);
    res.render('board/view-community', {
        title: 'mountain 커뮤니티',
        communityTwits: texts,
        likes,
    });
  } catch (error) {
    console.error(error);
    next(error);
  };
});

/* 게시글 DELETE */
router.get('/:id/delete', async (req, res, next) => {
  console.log(req.body);
  try {
      await CommunityPost.destroy(
          {where:{id:`${req.params.id}`}}
      );
      res.redirect('/community/page?offset=0&limit=2');
  } catch (error) {
    console.error(error);
    next(error);
  };
});

/* 게시글 좋아요 */
router.post('/:id/like', async(req, res, next) => {
    try {
        const post = await CommunityPost.find({ where: { id: req.params.id }});
        await post.addLiker(parseInt(req.user.id));
        res.send("좋아요");
    } catch (err) {
        console.error(err);
        next(err);
    }
});

/* 게시글 좋아요 취소 */
router.post('/:id/unlike', async(req, res, next) => {
    try {
        const post = await CommunityPost.find({ where: { id: req.params.id }});
        await post.removeLiker(parseInt(req.user.id));
        res.send('취소');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;