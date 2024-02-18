import Joi from "joi";

const addAddresstVal = Joi.object({
    street: Joi.string().trim().required(),
    phone: Joi.string().trim().required(),
    city: Joi.string().trim().required(),


})
const paramsIdVal = Joi.object({
    id: Joi.string().hex().length(24).required(),
})

const updateAddressVal = Joi.object({
    id: Joi.string().hex().length(24),
    street: Joi.string().trim(),
    phone: Joi.string().trim(),
    city: Joi.string().trim(),
})
export {
    addAddresstVal,
    paramsIdVal,
    updateAddressVal
}