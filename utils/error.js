class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, res) => {
  console.log(err);
  if (err.joi) {
    return res.status(400).json({ err: err.joi.message });
  }
  const { statusCode, message } = err;

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message
  });
};
module.exports = {
  ErrorHandler,
  handleError
};
