/* eslint-disable no-undef */
/* eslint-disable prefer-arrow-callback */
const mongoose = require("mongoose");
const slugify = require("slugify");

// Describing a Schema

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A tour must have a name"],
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
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
      required: [true, "A tour must have a description"],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, "A tour must have a cover Image"],
    },
    images: {
      type: [String],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: {
      type: [Date],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});

// DOCUMENT MIDDLEWARE : runs before .save() and .create()
tourSchema.pre("save", function (next) {
  //console.log(this);
  this.slug = slugify(this.name, { lower: true });  // this keyword is pointing to the currently saving document
  next();
});

tourSchema.pre('save', function(next){
  console.log('Will Save document.....')
  next()
})

tourSchema.post("save", function (doc, next) {
  console.log(doc);
  next();
});

// Creating model

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
