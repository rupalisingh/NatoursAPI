const fs = require("fs");
const mongoose = require("mongoose");
const dotnev = require("dotenv");
const Tour = require("../../models/tourModel");

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

// Read Json File
const tours = fs.readFileSync("tours.json", "utf-8");

// Import DATA into DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Delete all data from Collection
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log("Data successfully deleted");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

console.log(process.argv);

if (process.argv[2] === "---import") {
  importData();
} else if (process.argv[2] === "---delete") {
  deleteData();
}
