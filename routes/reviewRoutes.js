const express = require("express");
const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");

const reviewRouter = express.Router({ mergeParams: true });

reviewRouter.use(authController.protect)

reviewRouter
  .route("/")
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo("user"),
    reviewController.setTourUserIds,
    reviewController.createReview
  )
  .delete(reviewController.deleteReview)
  .patch(authController.restrictTo('user', 'admin') ,reviewController.updateReview)
  .get(reviewController.getReview);

module.exports = reviewRouter;
