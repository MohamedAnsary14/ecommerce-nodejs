import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { catchError } from "../../middleware/catchError.js"
import { userModel } from "../../../databases/models/user.model.js"
import { AppError } from "../../utils/appError.js"






const signup = catchError(async (req, res) => {
    let user = new userModel(req.body)
    await user.save()

    let token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_KEY)
    res.json({ message: "success", token })
})

const signin = catchError(async (req, res, next) => {
    let user = await userModel.findOne({ email: req.body.email })
    let match = bcrypt.compareSync(req.body.password, user.password)
    console.log(match);
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        let token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_KEY)

        return res.json({ message: "success", token })
    }

    next(new AppError('incorrect email or password', 401))
})




const changePassword = catchError(async (req, res, next) => {

    let user = await userModel.findById(req.user._id)
    console.log(user);
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        let token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_KEY)
        await userModel.findByIdAndUpdate(req.user._id, { password: req.body.newPassword, passwordChangedAt: Date.now() })
        return res.json({ message: "success", token })
    }
    next(new AppError('incorrect email or password', 401))
})



const protectedRoutes = catchError(async (req, res, next) => {
    let { token } = req.headers
    if (!token) return next(new AppError('token not provided', 401))
    let decoded = jwt.verify(token, process.env.JWT_KEY)
    let user = await userModel.findById(decoded.userId)
    if (!user) return next(new AppError('user not found', 401))
    if (user.passwordChangedAt) {
        let time = parseInt(user?.passwordChangedAt.getTime() / 1000)
        console.log(time + "|" + decoded.iat);
        if (time > decoded.iat) return next(new AppError('invalid token..login agin'))
    }
    req.user = user
    next()

})
const allowedTo = (...roles) => {
    console.log(roles);
    return catchError(async (req, res, next) => {
        if (!roles.includes(req.user.role))
            return next(new AppError('you are not authorized', 401))
        next()
    })
}

export {
    signup,
    signin,
    changePassword,
    protectedRoutes,
    allowedTo

}