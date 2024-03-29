import { request } from "express"
import { cartModel } from "../../../databases/models/cart.model.js"
import { orderModel } from "../../../databases/models/order.model.js"
import { productModel } from "../../../databases/models/product.model.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/appError.js"

import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51OjTmqB993sKrA9GWmXrAIMghtVZV844AzVe9dhkUHAKxiWkSi23KmZRu7SMJyZE4wjOLb3gylV3OLJRX67DKJUP00Qopom08P');

const creatCashOrder = catchError(async (req, res, next) => {
    let cart = await cartModel.findById(req.params.id)
    if (!cart) return next(new AppError('product not found', 404))

    let totalOrderPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice

    let order = new orderModel({
        user: req.user._id,
        orderItems: cart.cartItems,
        totalOrderPrice,
        shippingAddress: req.body.shippingAddress,

    })
    await order.save()
    let options = cart.cartItems.map((prod) => {
        return (
            {
                updateOne: {
                    "filter": { _id: prod.product },
                    "update": { $inc: { sold: prod.quantity, quantity: -prod.quantity } }
                }
            }
        )
    })
    await productModel.bulkWrite(options)
    await cartModel.findByIdAndDelete(req.params.id)
    res.json({ message: 'success', order })

})

const getspecificOrder = catchError(async (req, res, next) => {
    let order = await orderModel.findOne({ user: req.user._id }).populate('orderItems.product')
    res.status(200).json({ message: 'success', order })

})
const getAllOrders = catchError(async (req, res, next) => {
    let orders = await orderModel.find({}).populate('orderItems.product')
    res.status(200).json({ message: 'success', orders })

})
const creatCheckOutSession = catchError(async (req, res, next) => {
    let cart = await cartModel.findById(req.params.id)
    let totalOrderPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice

    let session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'egp',
                    unit_amount: totalOrderPrice * 1000,
                    product_data: {
                        name: req.user.name,
                    },
                },
                quantity: 1,

            },
        ],
        mode: 'payment',
        success_url: "https://route-comm.netlify.app/#/",
        cancel_url: "https://route-comm.netlify.app/#/cart",
        customer_email: req.user.email,
        client_reference_id: req.params.id,
        metadata: req.body.shippingAddress
    })
    res.status(200).json({ message: 'success', session })



})


// const creatOnlineSession = catchError(async (request, response) => {

//     const sig = request.headers[stripe - signature].toString();
//     let event;

//     event = Stripe.Webhook.constructEvent(request.body, sig, "whsec_yEGCBxMdLzcLo2PlWhz8NX75gLmnwEzs")

//     if (event.type == 'checkout.session.completed') {
//         let cart = await cartModel.findById(event.data.object.client_reference_id)
//         if (!cart) return next(new AppError('cart not found', 404))
//         let user = await userModel.findOne({ email: e.customer_email })

//         let order = new orderModel({
//             user: user._id,
//             orderItems: cart.cartItems,
//             totalOrderPrice: e.amount_total / 100,
//             shippingAddress: e.metadata.shippingAddress,
//             paymentType: "card",
//             isPaid: true,
//             paidAt: Date.now()
//         })
//         await order.save()
//         if (order) {
//             let options = cart.cartItems.map(prod => ({
//                 updateOne: {
//                     filter: { _id: prod.product },
//                     update: { $inc: { sold: prod.quantity, quantity: -prod.quantity } }
//                 }
//             }))
//             await productModel.bulkWrite(options)

//             await cartModel.findOneAndDelete({ user: user._id })
//             return res.status(200).json({ message: 'success', order })
//         }
//         return next(new AppError('order not found', 404))
//     } else {
//         console.log(`unhandled event type ${event.type}`);
//     }

// })

export {
    creatCashOrder,
    getspecificOrder,
    getAllOrders,
    creatCheckOutSession,
    // creatOnlineSession

}

