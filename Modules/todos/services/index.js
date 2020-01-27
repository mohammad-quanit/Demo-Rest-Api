const Todos = require("../models");

async function getTodos() {
  return await Todos.find()
}

async function addTodos(todosParam) {
  const todo = new Todos(todosParam);
  console.log(todo);
  await todo.save();
}

module.exports = {
  getTodos,
  addTodos
}

