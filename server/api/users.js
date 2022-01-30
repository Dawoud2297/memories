import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

let users 

export const injectdbUser =async (client)=>{
    try {
        users = await client.db(process.env.DB_NAME).collection('users')
    } catch (error) {
        console.log(`UserInjectDB..${error}`)
    }
}

export const register = async ( req,res) =>{
    try {
        const { firstName, lastName, email, password } = req.body
        const hashedPassword = await bcrypt.hash(password,10)
        const emailExist = await users.findOne({email})
        const result =!emailExist && await users.insertOne({name : `${firstName} ${lastName}`, email,password :  hashedPassword,joinedAt : new Date().toLocaleString()})
        if(emailExist)return res.json('email already exist')
        const token = jwt.sign({email : result.email, id : result._id},process.env.SECRETKEY_FOR_JWT)
        res.json({result,token})
    } catch (error) {
        console.log(`UserRegister..${error}`)
    }
}

export const login = async (req,res)=>{
    try {
        const { email, password } = req.body
        const userLoged = await users.findOne({email})
        const comparePassword = userLoged && await bcrypt.compare(password,userLoged.password)
        if(!userLoged){
            res.json("email does not exist!")
        }else if(!comparePassword){
            res.json("Wrong password")
        }else{
            const token = jwt.sign({userLoged},process.env.SECRETKEY_FOR_JWT)
            res.json({result : userLoged, token})
        }
    } catch (error) {
        console.log(`UserLogin..${error}`)
    }
}