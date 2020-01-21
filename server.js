const express = require('express');
const cors = require('cors');
const socket = require("socket.io")
require('dotenv').config();

const connection = require("./configurations/mongoose.config")
const upload = require("./configurations/multer.config");
const appRoutes = require('./routes');


const port = process.env.PORT || 5500;
const app = express();
const server = app.listen(port, () => console.log(`Server is running on ${port}`))
const socketInstance = socket(server);

app.use(cors());
app.use(express.json());
app.use(appRoutes);

connection.once('open', () =>
  console.log('Successfully connected to Mongoose')
);

socketInstance.on("connection", socket => {
  // console.log('a user connected');
  socket.on('disconnect', function () {
      console.log('user disconnected');
  });
  socket.on('chat', function (msg) {
    socket.broadcast.emit('chat', msg);
    console.log(msg)
  });
});

app.post('/upload', upload.array('file') ,(req, res) => {
  let file = req.files.map(file => file.url = `${req.protocol}://${req.get('host')}/upload/${file.filename}`);
  console.log(file)
  res.json({ file });
});
app.use('/upload', express.static(__dirname + '/upload/'));


// ****** another way to connect to mongo ********//
// mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
//   if (err) return err.message;
//   console.log('Successfully connected to Mongoose')
// });


// app.use('/exercises', require('./routes/exercise.route'));
// app.use('/users', require('./routes/user.route'));
// app.use('/chartData', require('./routes/chartData.route'));
// app.use("/logs", require("./routes/logs.route"))

