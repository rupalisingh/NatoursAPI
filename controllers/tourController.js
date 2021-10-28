/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable no-unused-vars */
const Tour = require("../models/tourModel");
const APIFeatures = require('../utils/apiFeatures')

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingAvverage, price";
  req.query.fields = "name,price,ratingsAvverage, summary, difficulty";
  next();
};



// const tours = JSON.parse(fs.readFileSync("./dev-data/data/tours-simple.json"));

// exports.checkId = (req, res, next, val) => {
//     if (req.params.id * 1 > tours.length) {
//        return  res.status(404).json({
//           status: "fail",
//           data: {
//             tour: "Tour not found",
//           },
//         });
//       }
//     next()
// }

// exports.checkBody = (req, res, next) => {
//     if(!req.body.name || !req.body.price){
//         return res.status(400).json({
//             status : 'fail',
//             message : 'Missing name or Price'
//         })
//     }
//     next()
// }

exports.getAllTours = async (req, res) => {
  try {
    // eslint-disable-next-line node/no-unsupported-features/es-syntax

    // BUILD QUERY
    // 1) FIltering
    // const queryObj = { ...req.query };
    // const excludedFields = ["page", "sort", "limit", "fields"];
    // excludedFields.forEach((el) => delete queryObj[el]);
    // console.log(req.query, queryObj);

    // // const tours = await Tour.find(req.query)
    // // 2) Advanced Filtering
    // let query = Tour.find(queryObj);
    // let queryStr = JSON.stringify(queryObj);
    // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // console.log(queryStr);

    //3) Sorting
    // if (req.query.sort) {
    //   const sortBy = req.query.sort.split(',').join(' ')
    //   query = query.sort(req.query.sort);
    //   // IF 2 items has same price - sort('price ratingAverage')
    // } else {
    //   // Will sort the data on the baseis of createdAt if no sorting is specified
    //   query = query.sort('-createdAt')
    // }

    // console.log(req.query);

    // 1st way to filter query
    // const tours = await Tour.find({
    //   duration : 5,
    //   difficulty : 'easy'
    // });

    // 2nd way to filter
    // const tours = await Tour.find()
    //   .where("duration")
    //   .equals(5)
    //   .where("difficulty")
    //   .equals("easy");

    // 4) Field Limiting
    // if(req.query.fields){
    //   const fields = req.query.fields.split(',').join(' ')
    //   query = query.select(fields)
    // }else {
    //   query.select('-__v')   // Excluding this v field using 'minus'
    // }

    //5)Pagination
    //?page=2&limit=10
    // const page = req.query.page * 1 || 1
    // const limit = req.query.limit * 1 || 100
    // const skip = (page - 1) * limit
    // query = query.skip(skip).limit(limit)

    // if(req.query.page){
    //   const numTours = await Tour.countDocuments()
    //   if(skip >= numTours) throw new Error('This page does not exist')
    // }

    // EXECUTE QUERY
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;

    res.status(200).json({
      status: "success",
      length: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }

  // console.log(req.requestTime);
  // res.status(200).json({
  //   status: "success",
  //   requestedAt: req.requestTime,
  //   // results: tours.length,
  //   // data: {
  //   //   tours: tours,
  //   // },
  // });
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    //Tours.findOne({_id : req.params.id})
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
  // // req.params will automatically variable to the parameter
  // console.log(req.params);
  // const id = req.params.id * 1
  // // const tour = tours.find((el) => el.id === id);

  // res.status(200).json({
  //   status: "success",
  //   // results: tours.length,
  //   // data: {
  //   //   tours: tour,
  //   // },
  // });
};
exports.createTour = async (req, res) => {
  // const newTours = new Tour({})
  // newTours.save()

  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        data: {
          tour: newTour,
        },
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }

  //console.log(req.body)
  // const newId = tours[tours.length - 1].id + 1;
  // eslint-disable-next-line prefer-object-spread
  // const newTour = Object.assign({ id: newId }, req.body);
  // tours.push(newTour);
  // fs.writeFile(
  //   "./dev-data/data/tours-simple.json",
  //   // JSON.stringify(tours),
  //   // eslint-disable-next-line no-unused-vars
  //   (err) => {
  //     res.status(201).json({
  //       status: "success",
  //       // data: {
  //       //   tour: newTour,
  //       // },
  //     });
  //   }
  // );
};

exports.updateTour = async (req, res) => {
  try {
    const updateTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        tour: updateTour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.DeleteTour = async (req, res) => {
  try {
    const deleteTour = await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
