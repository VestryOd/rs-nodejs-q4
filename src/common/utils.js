const fs = require('fs');
const path = require('path');

const catchErrors = fn => async (req, res, next) => {
  try {
    return await fn(req, res, next);
  } catch (error) {
    return next(error);
  }
};

class CustomError extends Error {
  constructor({ status, message }) {
    super();
    this.status = status;
    this.message = message;
  }
}

const writeToFile = (filename, data) => {
  const pathToFile = path.resolve(filename);
  if (data) {
    fs.writeFileSync(pathToFile, JSON.stringify(data), 'utf-8', error => {
      if (error) {
        console.error(`Error caught, reason: ${error}`);
      }
    })
  }
};

module.exports = {
  catchErrors,
  CustomError,
  writeToFile,
};
