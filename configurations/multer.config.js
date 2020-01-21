const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
  destination: "../upload",
  filename: function(req, file, cb) {
    cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage });

module.exports = upload;


