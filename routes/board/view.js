const express = require('express');
const { CommunityPost, User } = require('../../models');
const fs = require('fs');
const fs2 = require('fs').promises;

const router = express.Router();

try {
  fs.readdirSync('uploads');
} catch(err) {
  console.error('uploads 폴더 생성');
  fs.mkdirSync('uploads');
}

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
  try { // 저장된 사진 DELETE
    const {img} = await CommunityPost.findOne({where: {id: parseInt(req.params.id, 10)}});
    const file = await fs2.readFile(img.replace('/img', './uploads'));
    if(file){
      await fs2.unlink(img.replace('/img', './uploads'));
    } 
    await CommunityPost.destroy({
      where: {id: parseInt(req.params.id, 10)},
    });
      res.redirect("/community/page?offset=0&limit=5");
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