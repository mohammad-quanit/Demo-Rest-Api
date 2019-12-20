const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const exerciseRoute = require('./routes/exercise.route');
const userRoute = require('./routes/user.route');

require('dotenv').config();
const port = process.env.PORT || 5500;

const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});
const connection = mongoose.connection;
connection.once('open', () =>
  console.log('Successfully connected to Mongoose')
);

// mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
//   if (err) return err.message;
//   console.log('Successfully connected to Mongoose')
// });

app.use('/exercises', exerciseRoute);
app.use('/users', userRoute);
app.use('/chartData', require('./routes/chartData.route'));

let introHtml = `
  <h1>Welcome to Demo CRUD Api's</h1>
  <h3>Go to <a href="https://crud-demo-api.herokuapp.com/exercises">https://crud-demo-api.herokuapp.com/exercises</a> for any demo Todo list</h3>
  <h3>Go to <a href="https://crud-demo-api.herokuapp.com/users">https://crud-demo-api.herokuapp.com/users</a> for any demo User list</h3>
`;
app.get('/', (req, res) => res.send(introHtml));

app.listen(port, () => console.log(`Server is running on ${port}`));
