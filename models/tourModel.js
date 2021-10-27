const mongoose = require("mongoose");

// Describing a Schema

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"],
    unique: true,
    trim : true,
  },
  durations: {
    type: Number,
    required: [true, "A tour must have a duration"],
  },
  MaxGrpupSize: {
    type: Number,
    required: [true, "A tour must have a group size"],
  },
  difficulty: {
    type: String,
    required: [true, "A tour must have a difficulty"],
  },
  ratingsAvverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "A tour must have a price"],
  },
  priceDiscount: {
    type: Number,
  },
  summary: {
    type: String,
    trim: true,
    required :  [true, "A tour must have a description"]
  },
  description : {
    type : String,
    trim : true,
  },
  imageCover : {
    type : String,
    required : [true, "A tour must have a cover Image"],
  },
  images : {
    type : [String],
  },
  createdAt : {
    type : Date,
    default : Date.now(),
    select : false,
  },
  startDates : {
    type : [Date],
  }
});

// Creating model

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
