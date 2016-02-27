var express = require('express');
var app = express();
var http = require('http');
var urlMod = require('url');
var shorten = require('./shorten.js');
var path = require('path');
var shortToUrl = {};

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'front_page.html'));
});

app.get(/\w\w+\.\w{2,4}/, function (req, res) {
  var url = req.url.split('/').splice(1).join('/');
  var index = 1;
  var short, objUrl, mainRes;
  if(!/http/.test(url)){
    url = 'http://' + url;
  }
  objUrl = urlMod.parse(url, true);
  short = shorten.shortenUrl(url);
  mainRes = res;
  http.get(objUrl, function(res){
    while(shortToUrl.hasOwnProperty(short) && shortToUrl[short] !== url){
      short = shorten.shortenUrl(url+index);
      index++;
    }
    shortToUrl[short] = url;
    console.log(shortToUrl);
    mainRes.send(short);
  }).on('error', function(e){
    mainres.send('Not a valid url');
  });  
});

app.get(/^\/\w+$/, function (req, res){
  var short = req.url.split(/\//)[1];
	var url = shortToUrl[short];
  if(!url){
    res.send('Not a valid shortened url.');
  }
	res.redirect(url);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});