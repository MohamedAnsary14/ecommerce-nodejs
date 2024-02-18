import slugify from 'slugify'
import { catchError } from "../../middleware/catchError.js"
import { productModel } from '../../../databases/models/product.model.js'
import { deleteOne } from '../handlers/handlers.js'
import { ApiFeatures } from '../../utils/apiFeature.js'
const addProduct = catchError(async (req, res, next) => {

    req.body.slug = slugify(req.body.title)
    req.body.imgCover = req.files.imgCover[0].filename
    req.body.images = req.files.images.map((img) => img.filename)

    let product = new productModel(req.body)
    await product.save()
    res.json({ message: "success", product })
})
const getAllProducts = catchError(async (req, res, next) => {



    let apiFeatures = new ApiFeatures(productModel.find(), req.query)
        .pagination().fields().sort().search().filter()


    let products = await apiFeatures.mongooseQuery
    res.json({ message: "success", page: apiFeatures.pageNumber, products })
})
const getSingleProduct = catchError(async (req, res, next) => {

    let product = await productModel.findById(req.params.id)
    !product && res.status(404).json({ message: 'product Not Found' })
    product && res.json({ message: "success", product })
})
const updateProduct = catchError(async (req, res, next) => {

    if (req.body.name) req.body.slug = slugify(req.body.title)
    if (req.files.imgCover) req.body.imgCover = req.files.imgCover[0].filename
    if (req.files.images) req.body.images = req.files.images.map((img) => img.filename)


    let product = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    !product && res.status(404).json({ message: 'product Not Found' })
    product && res.json({ message: "success", product })

})
const deleteProduct = deleteOne(productModel)
export {
    addProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
}