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

// Creating port aat 3000

const port = 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION. Shutting Down....");
  server.close(() => {
    process.exit(1);
  });
});
