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

router.get('/', async (req, res) => {
  let page = Math.max(1, parseInt(req.query.page));     // 표시될 게시물 수
  let limit = Math.max(1, parseInt(req.query.limit));   // 보여줄 페이지
  page = !isNaN(page)?page:1;
  limit = !isNaN(limit)?limit:10;

  let skip = (page-1)*limit;        // 무시할 게시물의 수
  let count = await CommunityPost                 // 전체 테이블 수.... 어떻게 구하지
  let maxPage = Math.ceil(count/limit);           // 전체 / 보여줄 페이지 = 마지막 페이지
  let posts = await CommunityPost.findAll({})
    .populate('author')
    .sort('-createdAt')
    .skip(skip)             // 일정한 수만큼만 검색된 결과를 무시하는 함수
    .limit(limit)           // 일정한 수 만큼만 검색된 결과를 보여주는 함수
    .exec();

  res.render('board/main-community', {
    posts: posts,         // 
    currentPage: page,    // 표시될 게시물 수 
    maxPage: maxPage,     // 마지막 페이지
    limit: limit,         // 보여줄 페이지
  });
});

module.exports = router;