class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (error, req, res, next) => {
  error.message = error.message || "Internal Server Error";
  error.statusCode = error.statusCode || 500;

  if (error.name === "CaseError") {
    const message = `Resource not find ${error.path}`;
    error = new ErrorHandler(message, 400);
  }

  return res.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
};

export default ErrorHandler;
