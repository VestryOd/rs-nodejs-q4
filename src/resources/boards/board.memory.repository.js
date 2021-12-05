const boards = require('../../common/db/boards.json');
const Board = require('./board.model');

const getAllBoards = async () => Promise.resolve(boards);

const findBoard = boardId => {
  const board = {};
  boards.forEach((el, i) => {
    if (el.id === boardId) {
      board.index = i;
      board.data = { ...el };
    }
  });
  return board;
};

const createBoard = async payload => {
  const board = new Board({ ...payload });
  boards.push(board);
  return Promise.resolve({ ...board });
};

const getBoardById = async boardId => {
  const result = boards.find(board => board.id === boardId);
  if (!result) return null;
  return Promise.resolve({ ...result });
};

const updateBoard = async (boardId, payload) => {
  const { data, index } = findBoard(boardId);
  if (data && index) {
    boards[index] = {
      ...data,
      ...payload
    };
  }
  return !data && !index ? null : getBoardById(boardId);
};

const deleteById = async boardId => {
  const indexOfBoard = boards.findIndex(el => el.id === boardId);
  const board = boards[indexOfBoard];
  let deleted = null;
  if (indexOfBoard !== -1 && Object.keys(board).length) {
    deleted = boards.splice(indexOfBoard, 1);
  }
  const message = !deleted ? null : `Board ${board.title} with id ${boardId} was deleted`;
  return Promise.resolve(message);
};

module.exports = {
  getAllBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteById
};
