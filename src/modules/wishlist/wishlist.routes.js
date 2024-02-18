import express from 'express'
import { validation } from '../../middleware/validation.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'
import { addWishlistVal, paramsIdVal } from './wishlist.validation.js'
import { addToWishlist, getloggedUserWishlist, removeFromWishlist } from './wishlist.controller.js'
import { getAllReviews } from '../review/review.controller.js'

const wishlistRouter = express.Router()

wishlistRouter
    .route('/')
    .patch(protectedRoutes,allowedTo('user'),validation(addWishlistVal),addToWishlist)
    .get(protectedRoutes,allowedTo('user'),getloggedUserWishlist)


    wishlistRouter
    .route('/:id')
    .delete(protectedRoutes,allowedTo('user','admin'),validation(paramsIdVal),removeFromWishlist)
  


export default wishlistRouter