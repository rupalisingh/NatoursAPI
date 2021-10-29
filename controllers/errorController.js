/* eslint-disable prefer-const */
/* eslint-disable node/no-unsupported-features/es-syntax */
const AppError = require("../utils/appError")

const handleCasteErrorDB = (err) => {
  const message = `Invalid ${err.path} : ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
    const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0]
    const message = `Duplicate field values : ${value}. Please use another value!`
    return new AppError(message, 400);

}

const handleValidationErrorDB = (err) => {
    const errors => Object.values(err.errors).map(el => el.message)
    const message = `Invalid Input Data. ${errors.join('. ')}`
    return new AppError(message, 400);

}

const sendErrorForDEv = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorForProd = (err, res) => {
  // Operational, trusted Error : send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // 1) Log Error
    console.error("ERROR", err);

    // 2) Send Generic message
    res.status(500).json({
      status: "error",
      message: "Something went very wrong",
    });
  }
};

module.exports = (err, req, res, next) => {
  console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorForDEv(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    if (error.name === "CastError") error = handleCasteErrorDB(error);
    if(error.code === 11000) error = handleDuplicateFieldsDB(error)
    if(error.name === 'ValidationError') error = handleValidationErrorDB(error)

    sendErrorForProd(error, res);
  }
};
