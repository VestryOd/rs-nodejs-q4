const taskService = require('../tasks/task.service');
const {
  createBoard,
  deleteById,
  getAllBoards,
  getBoardById,
  updateBoard,
} = require('./board.memory.repository');

const getAll = async () => getAllBoards();

const getById = async (boardId) => getBoardById(boardId);

const create = async (payload) => createBoard(payload);

const update = async (boardId, payload) =>
updateBoard(boardId, payload);

const remove = async (boardId) => {
  const cleared = await taskService.clearTasksByBoardId(boardId);
  if (!cleared.length) {
    return deleteById(boardId);
  }
  return boardId;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
