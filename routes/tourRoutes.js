const express = require("express");
const tourControllers = require("../controllers/tourController");
const authController = require("../controllers/authController")

const tourRouter = express.Router();

// tourRouter.param('id', tourControllers.checkId)

tourRouter.param("id", (req, res, next, val) => {
  console.log(`Tour id is :${val}`);
  next();
});

tourRouter
  .route("/top-5-cheap")
  .get(tourControllers.aliasTopTours, tourControllers.getAllTours);

tourRouter.route("/tour-stats").get(tourControllers.getTourStats);
tourRouter.route("/monthly-plan/:year").get(tourControllers.getMonthlyPlan);


tourRouter
  .route("/")
  .get(authController.protect, tourControllers.getAllTours)
  .post(tourControllers.createTour);

tourRouter
  .route("/:id")
  .get(tourControllers.getTour)
  .patch(tourControllers.updateTour)
  .delete(authController.protect, authController.restrictTo('admin', 'lead-guide'), tourControllers.DeleteTour);

module.exports = tourRouter;
