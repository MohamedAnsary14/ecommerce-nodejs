import mongoose from "mongoose";

const schema =new mongoose.Schema({
    code: {
        type: String,
        unique:[true,'name is required'],
        trim: true,
        required: true,
        minLenght:[1,'too short coupon code']

    },
    expires: Date,
    discount: {
        type: Number,
        required: true,
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }
}, { timestamps: true })
export const couponModel = mongoose.model('coupon', schema)