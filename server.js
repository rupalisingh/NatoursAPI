const mongoose = require("mongoose");
const dotnev = require("dotenv");
const app = require("./app");

dotnev.config({ path: "./config.env" });

// console.log(app.get('env'))

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

//console.log(process.env);
//4) Start Server
mongoose
  .connect(DB)
  .then(() => console.log("DB connection successful!"))
  .catch((err) => {
    console.log(err);
  });

// Describing a Schema

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"],
    unique: true,
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

// Creating document
const testTour = new Tour({
  name: "The Parkk Camper",
  rating: 4.7,
  price: 997,
});

//save the document to database
testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log(err);
  });

const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
