const router = require('express').Router();
const todoService = require("../services");

router.get(fetchtodos)
router.post("/add", addTodos);


function fetchtodos(req, res, next) {
  todoService.getTodos()
    .then(data => res.json({data}))
    .catch(err => res.json(err));
}

function addTodos(req, res, next) {
  todoService.addTodos(req.body)
    .then(() => res.json('Todo added Successfully'))
    .catch(err => { next(err); res.send({err});  })
}

module.exports = router;