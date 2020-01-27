const router = require('express').Router();
const upload = require("../../middlewares/multer");

router.post('/upload', upload.array('file'), imgUpload);

function imgUpload(req, res) {
  let file = req.files.map(file => file.url = `${req.protocol}://${req.get('host')}/tmp/upload/${file.filename}`);
  console.log(file)
  res.json({ file });
}

module.exports = router;

// app.post('/tmp/upload', upload.array('file') ,(req, res) => {
//   let file = req.files.map(file => file.url = `${req.protocol}://${req.get('host')}/tmp/upload/${file.filename}`);
//   console.log(file)
//   res.json({ file });
// });