const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Server Error";

  if (statusCode === 500) {
    console.error(`[ERROR] ${message}`);``
    console.error(err.stack);
  }
  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;
