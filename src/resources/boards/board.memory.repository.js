const boardsDocument = require('../../common/db/boards.json') ;
const Board = require('./board.model');
const { writeToFile } = require('../../common/utils');
const { boardsPath } = require('../../common/constants');

const DB = boardsDocument?.map((el) => new Board(el));

const getAllBoards = async () => Promise.resolve(DB);

const findBoard = (boardId) => {
  const board = { index: 0, data: {} };
  DB.forEach((el, i) => {
    if (el.id === boardId) {
      board.index = i;
      board.data = { ...el };
    }
  });
  return board;
};

const createBoard = async (payload) => {
  const board = new Board({ ...payload });
  DB.push(board);
  writeToFile(boardsPath, JSON.stringify(DB));
  return Promise.resolve({ ...board });
};

const getBoardById = async (boardId) => {
  const result = DB.find((board) => board.id === boardId);
  if (!result) return null;
  return Promise.resolve({ ...result });
};

const updateBoard = async (boardId, payload) => {
  const { data, index } = findBoard(boardId);
  if (data && index) {
    DB[index] = {
      ...data,
      ...payload,
    };
  }
  writeToFile(boardsPath, JSON.stringify(DB));
  return !data && !index ? null : getBoardById(boardId);
};

const deleteById = async (boardId) => {
  const indexOfBoard = DB.findIndex((el) => el.id === boardId);
  const board = DB[indexOfBoard];
  let deleted = null;
  if (indexOfBoard !== -1 && board && Object.keys(board).length) {
    deleted = DB.splice(indexOfBoard, 1);
  }
  writeToFile(boardsPath, JSON.stringify(DB));
  const message = !deleted ? null : `Board ${board?.title} with id ${boardId} was deleted`;
  return Promise.resolve(message);
};

module.exports = { createBoard, deleteById, getAllBoards, getBoardById, updateBoard };
