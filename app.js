const fs = require("fs");
const express = require("express");
const morgan = require("morgan");

const app = express();

//1) MiddleWare

app.use(morgan("dev"));
app.use(express.json());

// Creating Own MiddleWare
app.use((req, res, next) => {
  console.log("Hello From the Middleware");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
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

const tours = JSON.parse(fs.readFileSync("./dev-data/data/tours-simple.json"));

// 2) Route Handlers

const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

const getTour = (req, res) => {
  // req.params will automatically variable to the parameter
  console.log(req.params);
  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "invalid Id",
    });
  }

  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours: tour,
    },
  });
};
const createTour = (req, res) => {
  //console.log(req.body)
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    "./dev-data/data/tours-simple.json",
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    res.status(404).json({
      status: "fail",
      data: {
        tour: "Tour not found",
      },
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      tour: "tour updated here",
    },
  });
};

const DeleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    res.status(404).json({
      status: "fail",
      data: {
        tour: "Tour not found",
      },
    });
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
};

const createUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
};

//app.get("/api/v1/tours", getAllTours);

// app.get("/api/v1/tours/:id", getTour);

//app.post("/api/v1/tours", createTour);

// app.patch("/api/v1/tours/:id", updateTour);

// app.delete("/api/v1/tours/:id", DeleteTour);

//3) Route
// 3.1) Mounting router
const tourRouter = express.Router();
const userRouter = express.Router();

app.use("/api/v1/tours", tourRouter);
tourRouter.route("/").get(getAllTours).post(createTour);

tourRouter.route("/:id").get(getTour).patch(updateTour).delete(DeleteTour);

userRouter.route("/").get(getAllUsers).post(createUsers);

userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

//4) Start Server

const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
