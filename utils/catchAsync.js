/* eslint-disable arrow-body-style */
// CATCHING ERRORS IN ASYNC FUNCTION
const catchAsync = (fn) => {
    return (req,res,next) => {
      fn(req, res, next).catch((err) => next(err));
    }
  };


module.exports = catchAsync



  