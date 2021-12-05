const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError")

exports.deleteOne = Model => catchAsync(async (req, res) => {
    try {
      const doc = await Model.findByIdAndDelete(req.params.id);
      if (!doc) {
        return next(new AppError("No Document found with that id", 404));
      }
      res.status(204).json({
        status: "success",
        data: null,
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err,
      });
    }
  })

exports.updateOne = Model => catchAsync(async (req, res) => {
    try {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!doc) {
        return next(new AppError("No document found with that id", 404));
      }
      res.status(200).json({
        status: "success",
        data: {
          data : doc,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err,
      });
    }
  })


exports.createOne = Model => catchAsync(async (req, res, next) => {
    // const newTours = new Tour({})
    // newTours.save()
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        data: {
          data: doc,
          runValidators: true,
        },
      },
    })