const express = require('express');
const request = require('request');
const APIkey = require('../../public/mountainInfo/javascripts/APIkey');
const convert = require('xml-js');
const Mountain = require('../../models/mountain')
// const saveApiData = require('../test');
const router = express.Router();

const servicekey = APIkey.servicekeyen
/* GET page. */
// router.get('/', (req, res) => {
// res.render('mountainInfo/infomountain');
// });

router.get("/", async (req, res, next) => {
  try {
    const mountains = await Mountain.findAll({});
    res.render('mountainInfo/infomountain', {
      title: 'mountain feed',
      APIdata: mountains,
    });
  } catch (error) {
    console.error(error);
    next(error);
  };
});

module.exports = router;
