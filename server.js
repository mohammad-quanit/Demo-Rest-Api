const express = require('express');
const cors = require('cors');
const socket = require("socket.io")
require('dotenv').config();
const errorHandler = require("./middlewares/errorHandler");
const headers = require("./headers");
const connection = require("./middlewares/mongoose.config")
const upload = require("./middlewares/multer");
const appRoutes = require('./routes');

const port = process.env.PORT || 80;
const app = express();



app.use(express.json());
// preventing cors issues
app.use(cors());
// app routes
app.use(appRoutes);
// // app headers
app.use(headers);
// global error handler
app.use(errorHandler);

connection.once('open', () =>
  console.log('Successfully connected to Mongoose')
);

app.post('/tmp/upload', upload.array('file') ,(req, res) => {
  let file = req.files.map(file => file.url = `${req.protocol}://${req.get('host')}/tmp/upload/${file.filename}`);
  console.log(file)
  res.json({ file });
});
app.use('/tmp/upload', express.static(__dirname + '/tmp/upload/'));

let introHtml = `
  <h1>Welcome to Demo CRUD Api's</h1>
`;

app.get("/", (req, res) => res.send(introHtml));
const server = app.listen(port, () => console.log(`Server is running on ${port}`));
const socketInstance = socket(server);
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

// ****** another way to connect to mongo ********//
// mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
//   if (err) return err.message;
//   console.log('Successfully connected to Mongoose')
// });


// app.use('/exercises', require('./routes/exercise.route'));
// app.use('/users', require('./routes/user.route'));
// app.use('/chartData', require('./routes/chartData.route'));
// app.use("/logs", require("./routes/logs.route"))

