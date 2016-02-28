
module.exports = {
  shortenUrl: function(url){
    url = url.toString();
    var temp = url.split('').map(toCode).reduce(add);
    temp = changeBase(temp);
    return temp.map(getBaseNum).join('');
  },
  getNewUrl: function(url, short){
    short = 'https://jxq.herokuapp.com/' + short;
    return {original_url: url, short_url: short};
  },
  getErr: function(){
    return {error: "URL invalid"};
  }
}

function add(a, b){
  return a+b;
}

function toCode(char){
  return char.charCodeAt();
}

function changeBase(num, result){
  var remainder = 0;
  
  result = result || [];
    
  if(num < 62){
    result.push(num);
    return result;
  }else{
    remainder = num % 62;
    result.push(remainder);
    num = Math.floor(num/62);
    return changeBase(num, result)
  }
}

function getBaseNum(num){
  if(num > 9 && num < 36){
    return String.fromCharCode(num+87);
  }else if(num > 35){
    return String.fromCharCode(num+29)
  }else{
  return num;
  }
}
