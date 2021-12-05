const express = require("express");
const morgan = require("morgan");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const reviewController = require("../controllers/reviewController");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
const userRouter = express.Router();


userRouter.post("/signup", authController.signUp);
userRouter.post("/login", authController.login);

userRouter.post("/forgotPassword", authController.forgotPassword);
userRouter.patch("/ResetPassword/:token", authController.resetPassword);

// Protect all Routes after this middleware
userRouter.use(authController.protect)
userRouter.patch(
  "/updateMyPassword",
  authController.protect,
  authController.updatePassword
);

userRouter.get(
  "/me",
  authController.protect,
  userController.getMe,
  userController.getUser
);
userRouter.patch("/updateMe", authController.protect, authController.updateMe);
userRouter.delete("/deleteMe", authController.protect, authController.deleteMe);

userRouter.use(authController.restrictTo('admin'))

userRouter
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUsers);

userRouter
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = userRouter;
