const express = require('express');
const router = express.Router();

/* GET page. */
router.get('/', (req, res) => {
  res.render('infomountain');
});

module.exports = router;
