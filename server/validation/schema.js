import Joi from '@hapi/joi'

export const register = Joi.object().keys({
    firstName : Joi.string().required(),
    lastName : Joi.string().required(),
    email : Joi.string().email().required(),
    password : Joi.string().required().min(10),
    confirmPassword : Joi.string().required().min(10)
})