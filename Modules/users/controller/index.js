const router = require('express').Router();
const verifyToken = require('../../../middlewares/jwt');
const userService = require('../services');

// Users post request
router.get('/', verifyToken, users);
router.post('/register', register);
router.post('/login', login);

function users(req, res, next) {
  userService
    .fetchUsers()
    .then(data => res.json(data))
    .catch(err => {
      next(err);
      // res.json({ err });
    });
}

function register(req, res, next) {
  userService
    .createUser(req.body)
    .then(data => res.status(200).json(data))
    .catch(err => {
      next(err);
      // res.json({ err });
    });
}

function login(req, res, next) {
  userService
    .loginUser(req.body)
    .then(user => res.json(user))
    .catch(err => {
      next(err);
      // res.json({ err });
    });
}

module.exports = router;
