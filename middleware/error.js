const { handleError } = require("../utils/error");

const errorMiddleware = (err, req, res, next) => {
  handleError(err, res);
};

module.exports = errorMiddleware;
