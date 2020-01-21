const fs = require("fs");

let myReadStream = fs.createReadStream(`${__dirname}/data-file/data.txt`, 'utf8'); 

myReadStream.on('data', chunk => {
  console.log(`New chunk received..........`);
  console.log(chunk);
})