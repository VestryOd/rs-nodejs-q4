const {
  getAllTasksByBoardId,
  getTaskById,
  createTask,
  updateTaskInfo,
  removeTaskById,
  deleteTaskByBoard,
  updateTaskWhenUserDeleted,
} = require('./task.memory.repository');

const getAllByBoardId = async boardId => getAllTasksByBoardId(boardId);

const getById = async taskId => getTaskById(taskId);

const create = async task => createTask(task);

const update = async (taskId, boardId, payload) => updateTaskInfo(taskId, boardId, payload);

const deleteById = async taskId => removeTaskById(taskId);

const clearTasksByBoardId = async boardId => deleteTaskByBoard(boardId);

const updateTasks = async userId => updateTaskWhenUserDeleted(userId);

module.exports = {
  getAllByBoardId,
  getById,
  create,
  update,
  deleteById,
  clearTasksByBoardId,
  updateTasks
};
