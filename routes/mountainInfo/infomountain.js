const express = require('express');
const APIkey = require('../../public/mountainInfo/javascripts/APIkey');
const router = express.Router();
const axios = require('axios');

router.get('/', (req, res) => {
  res.render('mountainInfo/infomountain');
});

router.post('/location', async function (req, res, next) {
  const servicekey = APIkey.servicekeyen;
  const url1 = 'http://openapi.forest.go.kr/openapi/service/cultureInfoService/gdTrailInfoOpenAPI';
  var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + servicekey; /* Service Key*/
  queryParams += '&' + encodeURIComponent('searchArNm') + '=' + encodeURIComponent(req.body.location); /* */
  queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent("30"); /* */
  let fullurl1 = url1 + queryParams;
  try {
    const rawdata = await axios.get(fullurl1);
    const APIdata = rawdata.data.response.body.items.item;
    res.json(APIdata);
  } catch (error) {
    console.log(error)
  }
});

router.post('/location/detail', async function (req, res, next) {
  const servicekey = APIkey.servicekeyen;
  const url1 = 'http://openapi.forest.go.kr/openapi/service/cultureInfoService/gdTrailInfoOpenAPI';
  var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + servicekey; /* Service Key*/
  queryParams += '&' + encodeURIComponent('searchMtNm') + '=' + encodeURIComponent(req.body.detail); /* */
  queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent("30"); /* */
  let fullurl1 = url1 + queryParams;
  try {
    const rawdata = await axios.get(fullurl1);
    const APIdata = rawdata.data.response.body.items.item;
    res.json(APIdata);
  } catch (error) {
    console.log(error)
  }
});

router.post('/img', async function (req, res, next) {
  console.log(req.body.mountainAdd)
  const servicekey = APIkey.servicekeyen;
  const url1 = 'http://openapi.forest.go.kr/openapi/service/trailInfoService/getforeststoryservice';
  var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + servicekey; /* Service Key*/
  queryParams += '&' + encodeURIComponent('mntnAdd') + '=' + encodeURIComponent(req.body.mountainAdd); /* */
  let fullurl1 = url1 + queryParams;
  console.log(fullurl1)
  try {
    const rawdata = await axios.get(fullurl1);
    const APIdata = rawdata.data.response.body.items.item;

    res.json(APIdata);
  } catch (error) {
    console.log(error)
  }
});

module.exports = router;
