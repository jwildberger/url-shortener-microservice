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
    mainRes.send(shorten.getNewUrl(url, short));
  }).on('error', function(e){
    mainRes.send(shorten.getErr());
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

app.use(function(req, res, next) {
  res.status(404).send(shorten.getNewUrl(url, short));
});

app.listen(process.env.PORT||3000);