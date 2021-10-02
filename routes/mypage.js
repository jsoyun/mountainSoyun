const express = require('express');
const router = express.Router();

/* GET page. */
router.get('/', (req, res) => {
  res.render('mypage', { title: '내 정보' });
});
module.exports = router;
