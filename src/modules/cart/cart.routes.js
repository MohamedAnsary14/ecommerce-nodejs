import express from 'express'
import { validation } from '../../middleware/validation.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'
import { addToCart, applyCoupon, clearUserCart, getloggedUserCart, removeItemFromCart, updateQuantity } from './cart.controller.js'
import { addToCarttVal, paramsIdVal, updateQtyVal } from './cart.validation.js'


const cartRouter = express.Router()

cartRouter
    .route('/')
    .post(protectedRoutes, allowedTo('user'), validation(addToCarttVal), addToCart)
    .get(protectedRoutes, allowedTo('user'), getloggedUserCart)
    .delete(protectedRoutes, allowedTo('user'), clearUserCart)
cartRouter.post('/applyCoupon', protectedRoutes, allowedTo('user'), applyCoupon)

cartRouter
    .route('/:id')
    .delete(protectedRoutes, allowedTo('user', 'admin'), validation(paramsIdVal), removeItemFromCart)
    .put(protectedRoutes, allowedTo('user'), validation(updateQtyVal), updateQuantity)



export default cartRouter