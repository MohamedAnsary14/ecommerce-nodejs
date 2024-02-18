import { userModel } from "../../databases/models/user.model.js"
import { AppError } from "../utils/appError.js"
import bcrypt from "bcrypt"

export const checkEmail = async (req, res, next) => {
    let user = await userModel.findOne({ email: req.body.email })
    if (user) return next(new AppError('user already exists',409))
    // req.body.password = bcrypt.hashSync(req.body.password, 8)
    next()
}