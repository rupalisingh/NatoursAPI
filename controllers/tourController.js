const fs = require("fs");

const tours = JSON.parse(fs.readFileSync("./dev-data/data/tours-simple.json"));

exports.checkId = (req, res, next, val) => {
    if (req.params.id * 1 > tours.length) {
       return  res.status(404).json({
          status: "fail",
          data: {
            tour: "Tour not found",
          },
        });
      }
    next()
}

exports.checkBody = (req, res, next) => {
    if(!req.body.name || !req.body.price){
        return res.status(400).json({
            status : 'fail',
            message : 'Missing name or Price'
        })
    }
    next()
}

exports.getAllTours = (req, res) => {
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

exports.getTour = (req, res) => {
  // req.params will automatically variable to the parameter
  console.log(req.params);
  const id = req.params.id * 1
  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours: tour,
    },
  });
};
exports.createTour = (req, res) => {
  //console.log(req.body)
  const newId = tours[tours.length - 1].id + 1;
  // eslint-disable-next-line prefer-object-spread
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    "./dev-data/data/tours-simple.json",
    JSON.stringify(tours),
    // eslint-disable-next-line no-unused-vars
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

exports.updateTour = (req, res) => {
  
  res.status(200).json({
    status: "success",
    data: {
      tour: "tour updated here",
    },
  });
};

exports.DeleteTour = (req, res) => {
  
  res.status(204).json({
    status: "success",
    data: null,
  });
};