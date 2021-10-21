const express = require("express");
const morgan = require('morgan')
const userController = require("../controllers/userController")

const app = express()

app.use(morgan("dev"));
app.use(express.json());
const userRouter = express.Router();



userRouter.route("/").get(userController.getAllUsers).post(userController.createUsers);

userRouter.route("/:id").get(userController.getUser).patch(userController.updateUser).delete(userController.deleteUser);

module.exports = userRouter