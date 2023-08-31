const http = require('http');
const path = require('path');
const fs = require('fs');

http.createServer((req, res)=>{
  //checking the url of the user 
  let filePath = path.join(__dirname, 'public', req.url ==='/' ? 'home.html' : req.url);

  // getting the extension of the file 
  let extname = path.extname(filePath);

  //writing the content type of the file 
  let contentType = 'text/html';
  
  //checking if exname and the contentType 
  switch(extname){
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;

  }

  // read the files 
  fs.readFile(filePath, (err, data)=>{
    if(err){
      if (err.code === 'ENOENT'){
        //page not found
        fs.readFile(path.join(__dirname, 'public', '404.html'), (err, data)=>{
          if (err) throw err;
          res.writeHead(200, {'ContenType' : 'text/html'});
          res.end(data, 'utf8');
        })
      }else{
        //some server error 
        res.writeHead(500);
        res.end(`server error ${err.code}`);
      }
    }else{
      //succes
      res.writeHead(200, {'ContentType' : contentType});
      res.end(data, 'utf8');
    }
  })

  }).listen(5001, ()=> console.log('server is running on 5001:'));