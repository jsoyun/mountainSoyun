const express = require('express');
const APIkey = require('../../public/mountainInfo/javascripts/APIkey');
const router = express.Router();
const axios = require('axios');


/* GET page. */
router.get('/', (req, res) => {
  res.render('mountainInfo/infomountain');
});

router.post('/location', async function (req, res, next) {
  console.log("//////////////////////////////////////////////////////");
  console.log(req.body);
  console.log("//////////////////////////////////////////////////////");
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

module.exports = router;
