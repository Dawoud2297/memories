import { register } from './schema.js'

export const registeration = async (req,res,next)=>{
    try {
        await register.validateAsync(req.body)
        next()
    } catch (error) {
        res.json(error.details[0].message)
    }
}