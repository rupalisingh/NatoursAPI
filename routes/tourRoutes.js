
const express = require("express");
const tourControllers = require("../controllers/tourController")

const tourRouter = express.Router();

tourRouter.param('id', tourControllers.checkId)

tourRouter.param('id', (req, res, next, val) => {
    console.log(`Tour id is :${val}`)
    next()
})

tourRouter.route("/").get(tourControllers.getAllTours).post(tourControllers.checkBody ,tourControllers.createTour);

tourRouter.route("/:id").get(tourControllers.getTour).patch(tourControllers.updateTour).delete(tourControllers.DeleteTour);

module.exports = tourRouter;
