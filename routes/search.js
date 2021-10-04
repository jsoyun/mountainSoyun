const express = require('express');
const url = require('url');
const { CommunityPost, User, Sequelize } = require('../models');
const router = express.Router();

const Op = Sequelize.Op;    // LIKE

/* 검색 기능 */
router.get('/', async (req, res, next) => {
    try {
        let queryData = url.parse(req.url, true).query;
        let search = queryData.search;

        const texts = await CommunityPost.findAll({
            where: {
                title: {
                    [Op.like]: "%" + search + "%"
                }
            },
            order: [['createdAt', 'DESC']],
        });
        res.render('main-community', {
            title: `mountain - ${search} 검색 결과`,
            communityTwits: texts,
        });
    } catch (error) {
        console.error(error);
        next(error);
    };
})

module.exports = router;