let { tasks } = require('../../common/db/tasks.json');
const Task = require('./task.model');

const getAllTasksByBoardId = async boardId => Promise.resolve(tasks.filter(task => task.boardId === boardId));

const getTaskById = async taskId => Promise.resolve(tasks.find(task => task.id === taskId ));

const createTask = async payload => {
  const task = new Task({ ...payload });
  tasks.push(task);
  return Promise.resolve(task);
};

const updateTaskInfo = async (taskId, boardId, payload) => {
  const indexOfTask = tasks.findIndex(el => el.id === taskId);
  if (indexOfTask === -1) return null;
  const updatedTask = {
    ...tasks[indexOfTask],
    ...payload
  };
  tasks[indexOfTask] = { ...updatedTask };
  return Promise.resolve(updatedTask);
};

const removeTaskById = async taskId => {
  const indexOfTask = tasks.findIndex(el => el.id === taskId);
  const task = tasks[indexOfTask];
  let deleted = null;
  if (indexOfTask && Object.entries(task).length) {
    deleted = tasks.splice(indexOfTask, 1);
  }
  const result = !deleted || !deleted?.length
    ? null
    : `User ${task.title} with id ${taskId} was deleted`;
  return Promise.resolve(result)
};

const deleteTaskByBoard = async boardId => {
  tasks = tasks.filter(task => task.boardId !== boardId);
  const updated = await getAllTasksByBoardId(boardId);

  return Promise.resolve(updated);
};

const updateTaskWhenUserDeleted = async userId => {
  const entities = [];
  tasks = tasks.map(task => {
      const upd = task.userId !== userId
        ? task
        : {
          ...task,
          userId: null
        };
      if (upd.userId === null) {
        entities.push(upd);
      }
      return upd;
    }
  );
  return Promise.resolve(entities);
};

module.exports = {
  getAllTasksByBoardId,
  getTaskById,
  createTask,
  updateTaskInfo,
  removeTaskById,
  deleteTaskByBoard,
  updateTaskWhenUserDeleted
};
