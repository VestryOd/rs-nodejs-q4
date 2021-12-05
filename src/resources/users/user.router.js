const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { CustomError, catchErrors } = require('../../common/utils');

router
  .route('/')
  .get(
    catchErrors(async (req, res, next) => {
      const users = await usersService.getAll();
      if (!users) return next(new CustomError({ status: 400, message: 'Bad request' }));
      return res.status(200).json(users.map(User.toResponse));
      // return true;
    })
  )
  .post(
    catchErrors(async (req, res, next) => {
      const user = await usersService.create({...req.body});
      if (!user) {
        return next(
          new CustomError({
            status: 404,
            message: '"Can\'t create, check your request"'
          })
        );
      }
      return res.status(201).json(User.toResponse(user));
      // return true;
    })
  );

router
  .route('/:userId')
  .get(
    catchErrors(async (req, res, next) => {
      const user = await usersService.getById(req.params?.userId);
      if (!(user && Object.entries(user).length)) {
        return next(
          new CustomError({
            status: 404,
            message: `User with id: ${req.params?.userId} not found`
          })
        );
      }
      return res.status(200).json(User.toResponse(user));
      // return true;
    })
  )
  .put(
    catchErrors(async (req, res, next) => {
      const { userId } = req.params;
      const user = await usersService.update({
        userId,
        payload: { ...req.body }
      });
      if (!(user && Object.entries(user).length)) {
        return next(
          new CustomError({
            status: 400,
            message: `Can't update, user with id: ${req.params?.id} not found`
          })
        );
      }
      return res.status(200).json(User.toResponse(user));
      // return true;
    })
  )
  .delete(
    catchErrors(async (req, res, next) => {
      const message = await usersService.remove(req.params?.userId);
      if (!message) {
        return next(
          new CustomError({
            status: 404,
            message: `User with id: ${req.params.id} not found`
          })
        );
      }
      return res.status(200).json(User.toResponse(message));
      // return true;
    })
  );

module.exports = router;
