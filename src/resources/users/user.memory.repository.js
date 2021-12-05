const users = require('../../common/db/users.json');
const User = require('./user.model.js');

const getAll = async () => Promise.resolve(users);

const getUserById = async userId => {
  const result = users.find(user => user.id === userId);
  if (!result) {
    return null;
  }
  return Promise.resolve(result);
};

const updateUserInfo = async ({ userId, payload }) => {
  const indexOfUser = users.findIndex(el => el.id === userId);
  if (indexOfUser === -1) return null;
  const updatedUser = {
    ...users[indexOfUser],
    ...payload
  };
  users[indexOfUser] = updatedUser;
  return Promise.resolve({ ...updatedUser });
};

const createUser = async payload => {
  const user = new User(payload);
  users.push(user);
  return Promise.resolve(User.toResponse(user));
};

const removeUserById = async userId => {
  const indexOfUser = users.findIndex(el => el.id === userId);
  const user = users[indexOfUser];
  let deleted = null;
  if (indexOfUser && Object.keys(user).length) {
    deleted = users.splice(indexOfUser, 1);
  }
  return !deleted || !deleted?.length
    ? null
    : `User ${user.name} with id ${userId} was deleted`;
};


module.exports = { getAll, getUserById, updateUserInfo, createUser, removeUserById };
