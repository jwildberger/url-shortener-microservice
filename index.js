var express = require('express');
var app = express();
var shorten = require('./shorten.js');
var shortToUrl = {};

app.get(/\./, function (req, res) {
  var url = req.url.split(/\//)[1];
  var short = shorten.shortenUrl(url);
  if(!/^http/.test(url)){
		url = 'http://' + url;
	}
  shortToUrl[short] = url;
});

app.get(/[A-Za-z0-9]/, function (req, res){
  var short = req.url.split(/\//)[1];
  console.log(short);
	var url = shortToUrl[short];
  if(!url){
    res.send('Not a valid shotened url.');
  }
	res.redirect(url);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});