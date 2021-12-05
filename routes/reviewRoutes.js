const express = require("express");
const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");

const reviewRouter = express.Router();

reviewRouter
  .route("/")
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo("user"),
    reviewController.createReview
  );

module.exports = reviewRouter;
