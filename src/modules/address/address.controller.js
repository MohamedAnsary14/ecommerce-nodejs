import { userModel } from "../../../databases/models/user.model.js"
import { catchError } from "../../middleware/catchError.js"



const addAddress = catchError(async (req, res, next) => {


    let address = await userModel.
    findByIdAndUpdate(req.user._id,{$addToSet:{addresses:req.body}}, { new: true })
    !address && res.status(404).json({ message: 'address Not Found' })
    address && res.json({ message: "success", address:address.addresses })

})
const removeAddress = catchError(async (req, res, next) => {


    let address = await userModel.findByIdAndUpdate(req.user._id,{$pull:{addresses:{_id:req.params.id}}}, { new: true })
    !address && res.status(404).json({ message: 'address Not Found' })
    address && res.json({ message: "success", address:address.addresses })

})
const getloggedUserAddress = catchError(async (req, res, next) => {


    let {addresses} = await userModel.findById(req.user._id)
    addresses && res.json({ message: "success", addresses })

})
export {
    addAddress,
    removeAddress,
    getloggedUserAddress
}
