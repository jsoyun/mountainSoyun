const express = require('express');
const request = require('request');
const APIkey = require('../public/javascripts/APIkey');
const convert = require('xml-js');
const router = express.Router();

const servicekey = APIkey.servicekeyen;

const url = 'http://apis.data.go.kr/1400000/service/cultureInfoService/mntInfoOpenAPI';
var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + servicekey; /* Service Key*/
queryParams += '&' + encodeURIComponent('searchWrd') + '='; /* */
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('200'); /* */
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
const fullurl = url + queryParams;

request(fullurl, (error, response, body) => {
  if (!error && response.statusCode == 200) {
    console.log(fullurl);
    data = JSON.parse(convert.xml2json(body, { compact: true, spaces: 4 }));
    mountaindata = data.response.body.items.item
    // console.log(mountaindata);
    const variables = [];
    JSON.stringify(mountaindata, (key, val) => {
      if (key === 'mntitop' && val._text !== undefined) {
        variables.push({ mntitop: val._text });
      }
      console.log(variables);
      return val;
    });
    // const variables = []
    // const arrdataset = mountaindata.map(mountaindata => {
    //   variables.push({ mntiname: mountaindata.mntiname._text, mntilistno: mountaindata.mntilistno._text, mntihigh: mountaindata.mntihigh._text, mntiadd: mountaindata.mntiadd._text, mntidetails: mountaindata.mntidetails._text, mntitop: mountaindata.mntitop._text });
    // });
    // console.log(variables);
    // console.log(variables.length);
  }
});
