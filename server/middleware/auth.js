import jwt from "jsonwebtoken";


const auth = async (req,res,next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1]
        const isCustomAuth = token.length < 500

        let decodedData

        if(token && isCustomAuth){
            decodedData = jwt.verify(token, process.env.SECRETKEY_FOR_JWT)
            req.userId = decodedData?.userLoged
        }else{
        decodedData = jwt.decode(token)
            req.userId = decodedData?.sub
        }
        next()
    } catch (error) {
        console.log(`from jwt...${error}`)
    }
}

export default auth