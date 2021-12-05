const { v4: uuidv4 } = require('uuid');
const { generateColumns } = require('./column.model');

class Board {
  constructor({ id = uuidv4(), title = 'BoardTitle', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = generateColumns(columns);
  }
}

module.exports = Board;
