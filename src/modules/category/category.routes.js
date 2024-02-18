import express from 'express'
import { addCategory, deleteCategory, getAllCategories, getSingleCategories, updateCategory } from './category.controller.js'
import { validation } from '../../middleware/validation.js'
import { addCategoryVal, paramsIdVal, updateCategoryVal } from './category.validation.js'
import { uploadSingleFile } from '../../services/fileUploads/fileUploads.js'
import subCategoryRouter from '../subcategory/subcategory.routes.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js'

const categoryRouter = express.Router()
categoryRouter.use('/:category/subcategories',subCategoryRouter)
categoryRouter
    .route('/')
    .post(protectedRoutes,allowedTo('user','admin'),uploadSingleFile('img'),validation(addCategoryVal),addCategory)
    .get(getAllCategories)


    categoryRouter
    .route('/:id')
    .get(validation(paramsIdVal),getSingleCategories)
    .put(protectedRoutes,uploadSingleFile('img'),validation(updateCategoryVal),updateCategory)
    .delete(protectedRoutes,validation(paramsIdVal),deleteCategory)
  


export default categoryRouter