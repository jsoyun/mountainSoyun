const express = require('express');
const request = require('request');
const APIkey = require('../public/javascripts/APIkey')
const convert = require('xml-js');
const router = express.Router();

const servicekey = APIkey.servicekeyen

/* GET page. */
const url = 'http://apis.data.go.kr/1400000/service/cultureInfoService/mntInfoOpenAPI';
var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + servicekey; /* Service Key*/
queryParams += '&' + encodeURIComponent('searchWrd') + '='; /* */
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('100'); /* */
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
const fullurl = url + queryParams;
console.log(fullurl);

router.get('/', (req, res) => {
  request(fullurl, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      // for (let i = 1; i < 50; i++) {
      data = JSON.parse(convert.xml2json(body, { compact: true, spaces: 4 }));
      mountaindata = data.response.body.items.item
      res.render('infomountain', { mountaindata });
      // }
    }
  });

});

module.exports = router;
