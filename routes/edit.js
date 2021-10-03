const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const { CommunityPost, User } = require('../models');

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
        res.render('edit-community', {
            title: 'mountain 커뮤니티 수정하기',
            communityTwits: editTexts,
        });
    } catch (error) {
      console.error(error);
      next(error);
    };
});

/* 게시글의 이미지 업로드 수정하기 */
/* multer 기본 설정 */
// const upload = multer({
//     storage: multer.diskStorage({
//       destination(req, file, done) {
//         done(null, 'uploads/');
//       },
//       filename(req, file, done) {
//         const ext = path.extname(file.originalname);
//         done(null, path.basename(file.originalname, ext) + Date.now() + ext);
//       },
//     }),
//     limits: { fieldSize: 5 * 1024 * 1024 },
// });

// /* 게시글 IMG CREATE */
// router.post('/img', upload.single('img'), (req, res) => {
//     console.log(req.file);
//     res.json({ url: `/img/${req.file.filename}` });
// });

// /* 게시글 UPDATE */
// router.post('/:id', async (req, res, next) => {
//     console.log(req.body);
//     try {
//         await CommunityPost.update(
//             {title:req.body.title,
//                 content:req.body.content},
//             {where:{id:`${req.params.id}`}}
//         );
//         res.redirect('/community');
//     } catch (error) {
//       console.error(error);
//       next(error);
//     };
// });

module.exports = router;