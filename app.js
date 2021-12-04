const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet")

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

//1) Global MiddleWare

// Set Securtiy HTTP headers
app.use(helmet())

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Implement Rate limiting from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP, please try again in an hour",
});

app.use('/api',limiter);

// Body Parser, reading data from body into req.body

app.use(express.json({limit : '10kb'}));

// Serving static files
app.use(express.static(`${__dirname}/public`));

// Creating Own MiddleWare
// app.use((req, res, next) => {
//   console.log("Hello From the Middleware");
//   next();
// });

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  //console.log(req.headers)
  next();
});

// app.get('/', (req,res) => {
// res.status(200).send('Hello from the server')
// })

//sending a json file

// app.get('/', (req,res) => {
//     res.status(200).json({message : 'Hello from the server', app : 'Natours-udemy'})
//     })

// app.post('/', (req, res) => {
//     res.send("You can post this to endpoint....")
// })

// 2) Route Handlers

//app.get("/api/v1/tours", getAllTours);

// app.get("/api/v1/tours/:id", getTour);

//app.post("/api/v1/tours", createTour);

// app.patch("/api/v1/tours/:id", updateTour);

// app.delete("/api/v1/tours/:id", DeleteTour);

//3) Route
// 3.1) Mounting router

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  // res.status(404).json({
  //   status: "fail",
  //   message: `Can't find ${req.originalUrl} on this server!`,
  // });
  // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  // err.status = "fail";
  // err.statusCode = 404;

  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// GLOBAL ERROR HANDLING MIDDLEWARE
app.use(globalErrorHandler);

module.exports = app;
