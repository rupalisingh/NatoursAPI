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



// // Creating document
// const testTour = new Tour({
//   name: "The Parkk Camper",
//   rating: 4.7,
//   price: 997,
// });

// //save the document to database
// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
