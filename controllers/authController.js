const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// Creating a common catch block for alll functions, to prevent repetitiveness
exports.signUp = catchAsync(async (req, res, next) => {
  // Creating security issue, since anyone can register them as admin
  //const newUser = await User.create(req.body);
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  // Logging the user into the application using jsonwebtoken right after signing up
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(200).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync( async(req, res, next) => {
  const { email, password, passwordConfirm } = req.body;

  //1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide Email and Password", 400));
  }

  // 2) CHeck if the user exist and password is correct
  const user = User.findOne({email : email}).select('+password')

  console.log(user)

  // 3) If everything ok, send token to client
  const token = ''
  res.status(200).json({
    status : 'success',
    token
  })
});
