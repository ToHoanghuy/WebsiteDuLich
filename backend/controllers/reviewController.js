const Review = require('../models/Review')
const reviewSvc = require('../services/reviewSvc')

module.exports.getAllReviews = async (req, res, next) => {
    try {
        const result = await reviewSvc.getAllReviews()
        res.status(200).json({
            isSuccess: true,
            data: result,
            error: null,
        });
    }
    catch(error) {
        next(error)
    }
}

module.exports.getReviewById = async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await reviewSvc.getReviewById(id)
        res.status(200).json({
            isSuccess: true,
            data: result,
            error: null,
        });
    }
    catch(error) {
        next(error)
    }
}

module.exports.getReviewByLocationId = async (req, res, next) => {
    try {
        const locationId = req.params.locationId
        const result = await reviewSvc.getReviewByLocationId(locationId)
        res.status(200).json({
            isSuccess: true,
            data: result,
            error: null,
        });
    }
    catch(error) {
        next(error)
    }
}

module.exports.createReview = async (req, res, next) => {
    try {
        const {locationId, rating, review, userId} = req.body
        console.log(res.locals.user._id)
        const reviewData = new Review({
            senderId: res.locals.user._id,
            locationId: locationId,
            rating: rating,
            review: review
        })
        console.log('BE1: ',locationId, rating, review)
        const result = await reviewSvc.createReview(reviewData)
        res.status(200).json({
            isSuccess: true,
            data: result,
            error: null,
        });
    }
    catch(error) {
        console.log('loi o day')
        next(error)
    }
}
module.exports.updateReview = async (req, res, next) => {
    const id = req.params.id
    const {reviewData}  = req.body
    try {
        const result = await reviewSvc.updateReview(id, reviewData)
        res.status(200).json({
            isSuccess: true,
            data: result,
            error: null,
        });
    }
    catch(error) {
        next(error)
    }
}
module.exports.deleteReview = async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await reviewSvc.deleteReview(id)
        res.status(200).json({
            isSuccess: true,
            data: result,
            error: null,
        });
    }
    catch(error) {
        next(error)
    }
}