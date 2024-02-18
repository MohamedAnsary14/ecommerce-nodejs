import { catchError } from "../../middleware/catchError.js"

import { deleteOne } from '../handlers/handlers.js'
import { ApiFeatures } from '../../utils/apiFeature.js'
import { reviewModel } from "../../../databases/models/review.model.js"
import { AppError } from "../../utils/appError.js"
import { couponModel } from "../../../databases/models/coupon.model.js"

const addCoupun = catchError(async (req, res, next) => {
    let isCoupunExist = await couponModel.findOne({ code: req.body.code})
    if (isCoupunExist) return next(new AppError('Coupun already Exists'))
    let coupun = new reviewModel(req.body)
    await coupun.save()

    res.json({ message: "success", coupun })
})
const getAllCoupuns = catchError(async (req, res, next) => {
    let apiFeatures = new ApiFeatures(couponModel.find(), req.query)
        .pagination().fields().sort().search().filter()
    let coupons = await apiFeatures.mongooseQuery
    res.json({ message: "success", page: apiFeatures.pageNumber, coupons })
})
const getSingleCoupun = catchError(async (req, res, next) => {

    let coupon = await couponModel.findById(req.params.id)
    !coupon && res.status(404).json({ message: 'coupon Not Found' })
    coupon && res.json({ message: "success", coupon })
})
const updateCoupun = catchError(async (req, res, next) => {


    let coupon = await couponModel.findOneAndUpdate({_id:req.params.id,user: req.user._id}, req.body, { new: true })
    !coupon && res.status(404).json({ message: 'coupon Not Found' })
    coupon && res.json({ message: "success", coupon })

})
const deleteCoupun = deleteOne(couponModel)
export {
    addCoupun,
    getAllCoupuns,
    getSingleCoupun,
    updateCoupun,
    deleteCoupun
}