# url-shortener-microservice

Project uploaded to heroku at http://jxq.herokuapp.com/.

The microservice takes in a url, converts the characters to character codes, 
then sums them. The sum is converted to base 62. This info is then stored in 
a javascript object, with the base 62 serving as the key, and the original
url as the value. This allows the shortened url to redirect the user to the 
given url.
