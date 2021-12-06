const usersDocument = require('../../common/db/users.json') ;

console.log('--userDocument', usersDocument);

const User = require('./user.model');
const { writeToFile } = require('../../common/utils');
const { usersPath } = require('../../common/constants');

const DB = usersDocument?.map((el) => new User(el));

const getAllUsers = async () =>
Promise.resolve(DB.map((el) => User.toResponse(el)));

const getUserById = async (userId) => {
  const result = DB.find((user) => user.id === userId);
  if (!result) {
    return null;
  }
  return Promise.resolve(User.toResponse(result));
};

const updateUserInfo = async ({
  userId,
  payload,
}) => {
  const index = DB.findIndex((el) => el.id === userId);
  const user = DB[index];
  const updated = { ...user, ...{ id: userId, ...payload } };
  DB.splice(index, 1, updated);
  writeToFile(usersPath, JSON.stringify(DB));
  return Promise.resolve(User.toResponse(updated));
};

const createUser = async (payload) => {
  const user = new User(payload);
  DB.push(user);
  writeToFile(usersPath, JSON.stringify(DB));
  return Promise.resolve(User.toResponse(user));
};

const removeUserById = async (userId) => {
  const indexOfUser = DB.findIndex((el) => el.id === userId);
  const user = DB[indexOfUser];
  let deleted = null;
  if (indexOfUser && typeof user === 'object' && Object.keys(user)?.length) {
    deleted = DB.splice(indexOfUser, 1);
  }
  writeToFile(usersPath, JSON.stringify(DB));
  return !deleted || !deleted?.length ? null : `User ${user?.name} with id ${userId} was deleted`;
};

module.exports = { createUser, getAllUsers, getUserById, removeUserById, updateUserInfo };
