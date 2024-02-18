import express from 'express'
import { validation } from '../../middleware/validation.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'

import { creatCashOrder, creatCheckOutSession, getAllOrders, getspecificOrder } from './order.controller.js'
import { creatOrderVal } from './order.validation.js'


const orderRouter = express.Router()

orderRouter
    .route('/')
    .get(protectedRoutes, allowedTo('user'), getspecificOrder)
orderRouter.get('/all', getAllOrders)
orderRouter
    .route('/:id')
    .post(protectedRoutes, allowedTo('user'), validation(creatOrderVal), creatCashOrder)
orderRouter.post('/checkOut/:id', protectedRoutes, allowedTo('user'), creatCheckOutSession)



export default orderRouter