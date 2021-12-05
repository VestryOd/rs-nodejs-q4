const taskService = require('../tasks/task.service');
const {
  createUser,
  getAllUsers,
  getUserById,
  removeUserById,
  updateUserInfo,
} = require('./user.memory.repository');

const getAll = async () => getAllUsers();

const getById = async (userId) =>
getUserById(userId);

const update = async ({
  userId,
  payload,
}) => updateUserInfo({ userId, payload });

const create = async (payload) => createUser(payload);

const remove = async (userId) => {
  await taskService.updateTasks(userId);
  return removeUserById(userId);
};

module.exports = { create, getAll, getById, remove, update };
