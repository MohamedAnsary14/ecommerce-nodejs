import { catchError } from "../../middleware/catchError.js"

import { deleteOne } from '../handlers/handlers.js'
import { ApiFeatures } from '../../utils/apiFeature.js'
import { reviewModel } from "../../../databases/models/review.model.js"
import { AppError } from "../../utils/appError.js"

const addReview = catchError(async (req, res, next) => {
    req.body.user = req.user._id
    let isReviewExist = await reviewModel.findOne({ user: req.user._id,product:req.body.product })
    if (isReviewExist) return next(new AppError('you created a review before'))
    let review = new reviewModel(req.body)
    await review.save()

    res.json({ message: "success", review })
})
const getAllReviews = catchError(async (req, res, next) => {
    let apiFeatures = new ApiFeatures(reviewModel.find(), req.query)
        .pagination().fields().sort().search().filter()
    let reviews = await apiFeatures.mongooseQuery
    res.json({ message: "success", page: apiFeatures.pageNumber, reviews })
})
const getSingleReview = catchError(async (req, res, next) => {

    let review = await reviewModel.findById(req.params.id)
    !review && res.status(404).json({ message: 'review Not Found' })
    review && res.json({ message: "success", review })
})
const updateReview = catchError(async (req, res, next) => {


    let review = await reviewModel.findOneAndUpdate({_id:req.params.id,user: req.user._id}, req.body, { new: true })
    !review && res.status(404).json({ message: 'review Not Found' })
    review && res.json({ message: "success", review })

})
const deleteReview = deleteOne(reviewModel)
export {
    addReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview
}