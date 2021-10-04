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

        // select 선택값
        const $select = document.getElementById('select');
        let value = 'title';    // default 값
        $select.addEventListener('change', () => {
            if($select.value == 'user') {
                value = 'user';
            } else {
                value = 'content';
            };
        });

        let texts;
        if(value == 'user') {
            texts = await CommunityPost.findAll({
                include: {
                    model: User,
                    attribute: ['id', 'nick'],
                },
                where: {
                    nick: {
                        [Op.like]: "%" + search + "%"
                    }
                },
                order: [['createdAt', 'DESC']],
            });
        } else if(value == 'content') {
            texts = await CommunityPost.findAll({
                where: {
                    content: {
                        [Op.like]: "%" + search + "%"
                    }
                },
                order: [['createdAt', 'DESC']],
            });
        } else {
            texts = await CommunityPost.findAll({
                where: {
                    title: {
                        [Op.like]: "%" + search + "%"
                    }
                },
                order: [['createdAt', 'DESC']],
            });
        };
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