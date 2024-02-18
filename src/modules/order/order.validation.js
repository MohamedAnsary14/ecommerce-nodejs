import Joi from "joi";

const creatOrderVal = Joi.object({
    id: Joi.string().hex().length(24).required(),
    product: Joi.string().hex().length(24),
    shippingAddress: Joi.object({
        street: Joi.string().trim().required(),
        phone: Joi.string().trim().required(),
        city: Joi.string().trim().required(),
    }).required(),
})

const paramsIdVal = Joi.object({
    id: Joi.string().hex().length(24).required(),
})

const updateQtyVal = Joi.object({
    id: Joi.string().hex().length(24).required(),
    quantity: Joi.number().options({ convert: false }).required(),
})
export {
    creatOrderVal,
    paramsIdVal,
    updateQtyVal
}