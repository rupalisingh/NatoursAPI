const mongoose = require("mongoose");


// Describing a Schema

const tourSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "A tour must have a name"],
      unique: true,
    },
    durations : {
      type : Number,
      required : [true, "A tour must have a duration"]
    },
    MaxGrpupSize : {
      type : Number,
      required : [true, 'A tour must have a group size']
    },
    difficulty : {
      type : String,
      required : [true, 'A tour must have a difficulty']
    },
    rating: {
      type: Number,
      default: 4.5,
    },
    price: {
      type: Number,
      required: [true, "A tour must have a price"],
    },
  });
  
  // Creating model
  
  const Tour = mongoose.model("Tour", tourSchema);

  module.exports = Tour