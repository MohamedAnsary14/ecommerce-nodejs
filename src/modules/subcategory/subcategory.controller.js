import slugify from 'slugify'
import { catchError } from "../../middleware/catchError.js"
import { subcategoryModel } from '../../../databases/models/subcategory.model.js'
import { deleteOne } from '../handlers/handlers.js'
import { ApiFeatures } from '../../utils/apiFeature.js'
const addSubCategory = catchError(async (req, res, next) => {

    req.body.slug = slugify(req.body.name)
    let subcategory = new subcategoryModel(req.body)
    await subcategory.save()

    res.json({ message: "success", subcategory })
})
const getAllSubCategories = catchError(async (req, res, next) => {


    let filterObj = {}
    if (req.params.category) {
        filterObj.category = req.params.category
    }
    let apiFeatures = new ApiFeatures(subcategoryModel.find(filterObj), req.query)
        .pagination().fields().sort().search().filter()

    let subCategories = await apiFeatures.mongooseQuery



    res.json({ message: "success", page: apiFeatures.pageNumber,subCategories })
})
const getSingleSubCategories = catchError(async (req, res, next) => {

    let subCategory = await subcategoryModel.findById(req.params.id)
    !subCategory && res.status(404).json({ message: 'subCategory Not Found' })
    subCategory && res.json({ message: "success", subCategory })
})
const updateSubCategory = catchError(async (req, res, next) => {
    if (req.body.name) req.body.slug = slugify(req.body.name)

    let subCategory = await subcategoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    !subCategory && res.status(404).json({ message: 'subCategory Not Found' })
    subCategory && res.json({ message: "success", subCategory })

})
const deleteSubCategory = deleteOne(subcategoryModel)
export {
    addSubCategory,
    getAllSubCategories,
    getSingleSubCategories,
    updateSubCategory,
    deleteSubCategory
}