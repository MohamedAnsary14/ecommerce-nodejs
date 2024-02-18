import { categoryModel } from "../../../databases/models/category.model.js"
import slugify from 'slugify'
import { catchError } from "../../middleware/catchError.js"
import { deleteOne } from "../handlers/handlers.js"
import { ApiFeatures } from "../../utils/apiFeature.js"
const addCategory = catchError(async (req, res, next) => {

    req.body.slug = slugify(req.body.name)
    req.body.image = req.file.filename
    let category = new categoryModel(req.body)
    console.log(category);
    await category.save()

    res.json({ message: "success", category })
})
const getAllCategories = catchError(async (req, res, next) => {
    let apiFeatures = new ApiFeatures(categoryModel.find(), req.query)
        .pagination().fields().sort().search().filter()

    let Categories = await apiFeatures.mongooseQuery


    res.json({ message: "success", Categories })
})
const getSingleCategories = catchError(async (req, res, next) => {

    let Category = await categoryModel.findById(req.params.id)
    !Category && res.status(404).json({ message: 'Category Not Found' })
    Category && res.json({ message: "success", Category })
})
const updateCategory = catchError(async (req, res, next) => {
    if (req.body.name) req.body.slug = slugify(req.body.name)
    if (req.file) req.body.image = req.file.filename

    let Category = await categoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    !Category && res.status(404).json({ message: 'Category Not Found' })
    Category && res.json({ message: "success", Category })

})
const deleteCategory = deleteOne(categoryModel)
export {
    addCategory,
    getAllCategories,
    getSingleCategories,
    updateCategory,
    deleteCategory
}