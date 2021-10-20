
const express = require("express");
const tourControllers = require("./../controllers/tourController")
const morgan = require('morgan')
const app = express();
app.use(morgan("dev"));
app.use(express.json());


const tourRouter = express.Router();



tourRouter.route("/").get(tourControllers.getAllTours).post(tourControllers.createTour);

tourRouter.route("/:id").get(tourControllers.getTour).patch(tourControllers.updateTour).delete(tourControllers.DeleteTour);

module.exports = tourRouter;
