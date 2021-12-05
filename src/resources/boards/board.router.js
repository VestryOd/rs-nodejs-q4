const router = require('express').Router();
const boardsService = require('./board.service');
const taskRouter = require('../tasks/task.router');
const { CustomError, catchErrors } = require('../../common/utils');

router
  .route('/')
  .get(
    catchErrors(async (req, res, next) => {
      const boards = await boardsService.getAll();
      if (!boards) {
        return next(new CustomError({ status: 400, message: 'Bad request' }));
      }
      return res.status(200).json(boards);
      // return true;
    })
  )
  .post(
    catchErrors(async (req, res, next) => {
      const board = await boardsService.create({ ...req.body });
      if (!(board && Object.entries(board).length)) {
        return next(
          new CustomError({
            status: 400,
            message: '"Can\'t create, check your request"'
          })
        );
      }
      return res.status(201).json(board);
      // return true;
    })
  );

router
  .route('/:boardId')
  .get(
    catchErrors(async (req, res, next) => {
      const board = await boardsService.getById(req.params.boardId);
      if (!(board && Object.entries(board).length)) {
        return next(
          new CustomError({
            status: 404,
            message: `Board with id: ${req.params.boardId} not found`
          })
        );
      }
      return res.status(200).json(board);
      // return true;
    })
  )
  .put(
    catchErrors(async (req, res, next) => {
      const { boardId } = req.params;
      const board = await boardsService.update(boardId, { ...req.body });
      if (!board) {
        return next(
          new CustomError({
            status: 400,
            message: `Can't update, board with id: ${req.params.boardId} not found`
          })
        );
      }
      return  res.status(200).json(board);
      // return true;
    })
  )
  .delete(
    catchErrors(async (req, res, next) => {
      const message = await boardsService.remove(req.params.boardId);
      if (!message) {
        return next(
          new CustomError({
            status: 404,
            message: `Board with id: ${req.params.boardId} not found`
          })
        );
      }
      return res.status(200).json(message);
      // return true;
    })
  );

router.use('/:boardId/tasks', taskRouter);

module.exports = router;
