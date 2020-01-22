const bcrypt = require('bcryptjs');
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
  return await user.save();
}

async function loginUser(userParam) {
  let user = await Users.findOne({ email: userParam.email });
  // checking user exist or not
  if (!user) throw `User ${userParam.email} doesn't exist!`;
  // checking if user is providing correct password
  if (!bcrypt.compareSync(userParam.password, user.password))
    throw `Please provide correct email or password!`;
  const { password, ...userWithoutPW } = user.toObject();
  return userWithoutPW;
}

module.exports = {
  fetchUsers,
  createUser,
  loginUser
};
