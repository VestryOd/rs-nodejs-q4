const {
  getAllUsers,
  getUserById,
  updateUserInfo,
  createUser,
  removeUserById
} = require('./user.memory.repository');
const { updateTasks } = require('../tasks/task.service');

const getAll = async () => getAllUsers();

const getById = async userId => getUserById(userId);

const update = async ({ userId, payload }) => updateUserInfo({ userId, payload });

const create = async payload => createUser(payload);

const remove = async userId => {
  await updateTasks(userId);
  return removeUserById(userId);
};

module.exports = { getAll, getById, update, create, remove };
