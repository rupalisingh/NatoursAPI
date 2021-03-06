const express = require("express");
const tourControllers = require("../controllers/tourController");
const authController = require("../controllers/authController");
//const reviewController = require("../controllers/reviewController")
const reviewRouter = require("../routes/reviewRoutes");

const tourRouter = express.Router();

// tourRouter.param('id', tourControllers.checkId)

tourRouter.param("id", (req, res, next, val) => {
  console.log(`Tour id is :${val}`);
  next();
});

//Nested Routes
// POST //tour/234gjsdlf/reviews
// GET/ tour/2flgjff/reviews
// GET/tour/sff234jfld/reviews/sdfhs2334f

// tourRouter
//   .route(":/tourId/reviews")
//   .post(
//     authController.protect,
//     authController.restrictTo("user"),
//     reviewController.createReview
//   );
// Using Express for nested Routes
tourRouter.use("/:tourId/reviews", reviewRouter);

tourRouter
  .route("/top-5-cheap")
  .get(tourControllers.aliasTopTours, tourControllers.getAllTours);

tourRouter.route("/tour-stats").get(tourControllers.getTourStats);
tourRouter
  .route("/monthly-plan/:year")
  .get(
    authController.protect,
    authController.restrictTo("admin", "lead-guide", "guide"),
    tourControllers.getMonthlyPlan
  );

tourRouter
  .route("/tours-within/:distance/center/:latlng/unit/:unit")
  .get(tourControllers.getTourWithin);
// /tours-distance?distance=223&center=-40,45&unit=mi
// /tours-distance/223/center/-40,45/unit/mi

tourRouter.route('/distances/:latlng/unit/:unit').get(tourControllers.getDistances)

tourRouter
  .route("/")
  .get(tourControllers.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourControllers.createTour
  );

tourRouter
  .route("/:id")
  .get(tourControllers.getTour)
  .patch(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourControllers.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourControllers.DeleteTour
  );

module.exports = tourRouter;
