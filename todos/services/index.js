const connection = require("../../middlewares/mongoose.config");
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


// // Exercises get request
// router.route('/').get((req, res) => {
//   Exercise.find()
//     .then(users => res.json(users))
//     .catch(err => res.status(400).json(err));
// });

// // Get Exercise by ID get request
// router.route('/:id').get((req, res) => {
//   Exercise.findById(req.params.id)
//     .then(exercise => res.json(exercise))
//     .catch(err => res.status(400).json(err));
// });

// // Delete Exercise by ID delete request
// router.route('/:id').delete((req, res) => {
//   Exercise.findByIdAndDelete(req.params.id)
//     .then(exercise => res.status(200).json(exercise))
//     .catch(err => res.status(400).json(err));
// });

// // Update Exercise by ID put request
// router.route('/update/:id').put((req, res) => {
//   const username = req.body.username;
//   const description = req.body.description;
//   const duration = Number(req.body.duration);
//   const date = Date.parse(req.body.date);
//   const updatedExercise = {
//     username,
//     description,
//     duration,
//     date
//   };
//   Exercise.findByIdAndUpdate(
//     req.params.id,
//     { $set: updatedExercise },
//     { new: true }
//   )
//     .then(exercise => res.status(200).json(exercise))
//     .catch(err => res.status(400).json(err));
// });

// // Exercises post request
// router.route('/add').post((req, res) => {
//   const username = req.body.username;
//   const description = req.body.description;
//   const duration = Number(req.body.duration);
//   const date = Date.parse(req.body.date);
//   const newExercise = new Exercise({
//     username,
//     description,
//     duration,
//     date
//   });
//   newExercise
//     .save()
//     .then(exercise => {
//       // logger.warn(`${JSON.stringify(exercise)} succesfully added.`);
//       // logger.info(`${JSON.stringify(exercise)} succesfully added.`)
//       return res.status(200).json(exercise);
//     })
//     .catch(err => {
//       errLogger.level = 'error';
//       errLogger.debug(err);
//       res.status(400).json(err)
//     });
// });

// module.exports = router;
