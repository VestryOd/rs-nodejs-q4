const { tasksDocument } = require('../../common/db/tasks.json');
const Task = require('./task.model');
const { writeToFile } = require('../../common/utils');
const { tasksPath } = require('../../common/constants');

const entitiesArray = typeof tasksDocument === 'string'
  ? JSON.parse(tasksDocument) : tasksDocument;
let DB = entitiesArray?.map((el) => new Task(el));

const getAllTasksByBoardId = async (boardId) =>
Promise.resolve(DB.filter((task) => task.boardId === boardId));

const getTaskById = async (taskId) =>
Promise.resolve(DB.find((task) => task.id === taskId) || null);

const createTask = async (payload) => {
  const task = new Task({ ...payload });
  DB.push(task);
  writeToFile(tasksPath, JSON.stringify(DB));
  return Promise.resolve(task);
};

const updateTaskInfo = async (
  taskId,
  _boardId,
  payload,
) => {
  const index = DB.findIndex((el) => el.id === taskId);
  const task = getTaskById(taskId);
  const updated = { ...task, ...{ id: taskId, ...payload } };
  if (index && index !== -1) {
    DB.splice(index, 1, updated);
  }
  writeToFile(tasksPath, JSON.stringify(DB));
  return Promise.resolve(updated);
};

const removeTaskById = async (taskId) => {
  const indexOfTask = DB.findIndex((el) => el.id === taskId);
  const task = DB[indexOfTask] || null;
  let deleted = null;
  if (indexOfTask && task && Object.entries(task).length) {
    deleted = DB.splice(indexOfTask, 1);
  }
  writeToFile(tasksPath, JSON.stringify(DB));
  const result =
    !deleted || !deleted?.length
      ? null
      : `User ${task?.title || 'task'} with id ${taskId} was deleted`;
  return Promise.resolve(result);
};

const deleteTaskByBoard = async (boardId) => {
  DB = DB.filter((task) => task.boardId !== boardId);
  const updated = await getAllTasksByBoardId(boardId);
  writeToFile(tasksPath, JSON.stringify(DB));
  return Promise.resolve(updated);
};

const updateTaskWhenUserDeleted = async (userId) => {
  DB?.forEach((task, index) => {
    if (task.userId === userId) {
      DB[index] = { ...task, userId: null };
    }
  });
  writeToFile(tasksPath, JSON.stringify(DB));
  return Promise.resolve(DB.filter((el) => el.userId === userId));
};

module.exports = {
  createTask,
  deleteTaskByBoard,
  getAllTasksByBoardId,
  getTaskById,
  removeTaskById,
  updateTaskInfo,
  updateTaskWhenUserDeleted,
};
