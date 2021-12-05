const {
  getAllBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteById
} = require('./board.memory.repository');
const { clearTasksByBoardId } = require('../tasks/task.service');

const getAll = async() => getAllBoards();

const getById = async boardId => getBoardById(boardId);

const create = async payload => createBoard(payload);

const update = async (boardId, payload) => updateBoard(boardId, payload);

const remove = async boardId => {
  const cleared = await clearTasksByBoardId(boardId);
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
  remove
};
