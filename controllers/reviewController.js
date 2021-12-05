const Review = require('../models/reviewModel')
const catchAsync = require('../utils/catchAsync')
const factory = require("./handlerFactory")


// exports.getAllReviews = catchAsync(async(req, res, next) => {
//     let filterObj = {}
//     if(req.params.tourId) filterObj = {tour : req.params.tourId}
//     const reviews = await Review.find(filterObj)

//     res.status(200).json({
//         status : 'success',
//         results : reviews.length,
//         data : {
//             reviews
//         }
//     })
// })


exports.setTourUserIds = (req, res, next) => {
    if(!req.body.tour) req.body.tour = req.params.tourId
    if(!req.body.user) req.body.user = req.user.id
}

// exports.createReview = catchAsync(async(req, res, next) => {
    //     // Allow nested Routes
    
    //     const newReview = await Review.create(req.body)
    
//     res.status(201).json({
    //         status : 'success',
    //         data : {
        //             review : newReview
        //         }
        //     })
        // })
        
exports.createReview = factory.createOne(Review)
exports.getReview = factory.getOne(Review)
exports.deleteReview = factory.deleteOne(Review)
exports.updateReview = factory.updateOne(Review)
exports.getAllReviews = factory.getAll(Review)