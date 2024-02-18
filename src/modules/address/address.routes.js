import express from 'express'
import { validation } from '../../middleware/validation.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'
import { addAddresstVal, paramsIdVal } from './address.validation.js'
import { addAddress, getloggedUserAddress, removeAddress } from './address.controller.js'

const addresstRouter = express.Router()

addresstRouter
    .route('/')
    .patch(protectedRoutes,allowedTo('user'),validation(addAddresstVal),addAddress)
    .get(protectedRoutes,allowedTo('user'),getloggedUserAddress)


    addresstRouter
    .route('/:id')
    .delete(protectedRoutes,allowedTo('user','admin'),validation(paramsIdVal),removeAddress)
  


export default addresstRouter