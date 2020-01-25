const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../models');

async function fetchUsers() {
  return await Users.find();
}

async function createUser(userParam) {
  // check if user exists
  if (await Users.findOne({ email: userParam.email }))
    throw 'User "' + userParam.email + '" is already taken';
  const user = new Users(userParam);
  // hashing password
  if (userParam.password) {
    user.password = bcrypt.hashSync(userParam.password, 10);
  }
  let token = jwt.sign(user.toObject(), process.env.JWT_SECRET_KEY, {
    expiresIn: '1d'
  });
  let { role, _id, username, email } = await user.save();
  return { _id, role, username, email, token };
}

async function loginUser(userParam) {
  let user = await Users.findOne({ email: userParam.email });
  // checking user exist or not
  if (!user) throw `User ${userParam.email} doesn't exist!`;
  // checking if user is providing correct password
  if (!bcrypt.compareSync(userParam.password, user.password))
    throw `Please provide correct email or password!`;

  let token = jwt.sign(user.toObject(), process.env.JWT_SECRET_KEY, {
    expiresIn: '1d'
  });
  let { role, _id, username, email } = user.toObject();
  return { _id, role, username, email, token };
}

module.exports = {
  fetchUsers,
  createUser,
  loginUser
};
