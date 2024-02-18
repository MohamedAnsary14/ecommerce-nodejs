import express from 'express'
import { validation } from '../../middleware/validation.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'
import { addCouponVal, paramsIdVal, updateCouponVal } from './coupon.validation.js'
import { addCoupun, deleteCoupun, getAllCoupuns, getSingleCoupun, updateCoupun } from './coupon.controller.js'

const couponRouter = express.Router()
couponRouter.use(protectedRoutes,allowedTo('admin'))
couponRouter
    .route('/')
    .post(validation(addCouponVal),addCoupun)
    .get(getAllCoupuns)


    couponRouter
    .route('/:id')
    .get(validation(paramsIdVal),getSingleCoupun)
    .put(validation(updateCouponVal),updateCoupun)
    .delete(validation(paramsIdVal),deleteCoupun)
  


export default couponRouter