const express = require('express');
const url = require('url');
const { CommunityPost, Sequelize } = require('../../models');
const router = express.Router();

const Op = Sequelize.Op;    // LIKE

/* 검색 기능 */
router.get('/', async (req, res, next) => {
  try {
    let queryData = url.parse(req.url, true).query;
    let search = queryData.search;
    let select = queryData.select;

    const texts = await CommunityPost.findAll({
      where: {
      [Op.or]: [{
          content : {
            [Op.like]: "%" + search + "%"
          }
        }, {
          title : {
            [Op.like]: "%" + search + "%"
          }
        },
      ]
      },
      order: [['createdAt', 'DESC']],
    });
    res.render('/board/main-community', {
      title: `mountain - ${search} 검색 결과`,
      communityTwits: texts,
    });
  } catch (error) {
    console.error(error);
    next(error);
  };
});

module.exports = router;