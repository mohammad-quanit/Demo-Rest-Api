const router = require('express').Router();

let introHtml = `
  <h1>Welcome to Demo CRUD Api's</h1>
  <h3>Go to <a href="https://crud-demo-api.herokuapp.com/exercises">https://crud-demo-api.herokuapp.com/exercises</a> for any demo Todo list</h3>
  <h3>Go to <a href="https://crud-demo-api.herokuapp.com/users">https://crud-demo-api.herokuapp.com/users</a> for any demo User list</h3>
`;

router.route("/").get((req, res) => res.send(introHtml));

module.exports = router;