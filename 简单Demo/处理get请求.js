const http = require('http');
const querystring = require('querystring');

const server = http.createServer((req,res) => {
  console.log(req.method); //Get
  
  const url = req.url;
  req.query = querystring.parse(url.split('?')[1]) //解析quertstring
  res.end(JSON.stringify(req.query));
});

server.listen(9999);