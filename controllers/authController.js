/* eslint-disable no-const-assign */
/* eslint-disable no-use-before-define */
/* eslint-disable arrow-body-style */
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Creating a common catch block for alll functions, to prevent repetitiveness
exports.signUp = catchAsync(async (req, res, next) => {
  const token = signToken(newUser._id);
  // Creating security issue, since anyone can register them as admin
  //const newUser = await User.create(req.body);
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  // Logging the user into the application using jsonwebtoken right after signing up
  token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
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

exports.login = catchAsync(async (req, res, next) => {
  const { email, password, passwordConfirm } = req.body;

  //1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide Email and Password", 400));
  }

  // 2) CHeck if the user exist and password is correct
  const user = await User.findOne({ email: email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  console.log(user);

  // 3) If everything ok, send token to client
  token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
});

// Protecting tour routes
exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and Check if its there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  console.log(token);
  if (!token) {
    return next(new AppError("You are not logged in", 401));
  }

  // 2) Verification Token

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);
  // 3) Check if user still exists

  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new AppError("The user belonging to this token no longer exist", 401)
    );
  }

  // 4) Check if user changed password after the token was issued
  if (freshUser.changePasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please login again", 401)
    );
  }
  // Grant access to the protected route
  req.user = freshUser;
  next();
});
