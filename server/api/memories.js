import { ObjectId } from "bson"
import crypto from 'crypto'
let memory

export const injectDB =async (client) =>{
    try {
        memory = await client.db(process.env.DB_NAME).collection('memories')
    } catch (error) {
        console.log(`memories injection DB...${error}`)
    }
}

export const allMemories = async (req,res)=>{
    try {
        const memories = await memory.find()
        const arrayOfMemos = await memories.toArray()
        res.json(arrayOfMemos)
    } catch (error) {
        console.log(`All memories..${error}`)
    }
}

export const createMemory = async (req,res) =>{
    try {
        const { title, message, tags, image} = req.body
        const insertMemo = await memory.insertOne({title, message,image,creator: req.userId?.name, creatorId : req.userId?._id, tags, likes:[],comments:[],reports:[], createdAt : new Date().toLocaleString()})
        res.json(insertMemo)
    } catch (error) {
        console.log(`Create memories..${error}`)
    }
}

export const editMemory = async (req,res)=>{
    try {
        const { title, creator, message, tags, image} = req.body
        const { id } = req.params
        const updateMemo = await memory.updateOne({_id : ObjectId(id)},
        {$set : { title, message, tags, image, updatedAt : new Date().toLocaleString()}}
        )
        res.json(updateMemo)
    } catch (error) {
        console.log(`Edit memories..${error}`)
    }
}

export const deleteMemo = async (req,res)=>{
    try {
        const { id } = req.params
        await memory.deleteOne({_id : ObjectId(id)})
        res.json('Successfully Deleted...')
    } catch (error) {
        console.log(`Delete memories..${error}`)
    }
}

export const likeMemo = async (req,res)=>{
    try {
        const { id } = req.params
        const findMemo = await memory.findOne({_id : ObjectId(id)})
        const index = findMemo.likes.findIndex((id)=> id === String(req.userId._id))
        if(index === -1){
            await memory.updateOne({_id : ObjectId(id)},
                {$push : {likes :  req.userId._id}}
                )
        }else{
            findMemo.likes = findMemo.likes.filter((id)=> id !== String(req.userId))
        }
        const finalPost = await memory.findOne({_id: ObjectId(id)})
        res.status(200).json(finalPost);
    } catch (error) {
        console.log(`Like memories..${error}`)
    }
}

export const commentOnMemo = async ( req,res)=>{
    let randomId = crypto.randomBytes(12).toString("hex").toLocaleLowerCase();
    try {
        const { id } = req.params
        const { comment } = req.body
         await memory.updateOne({_id : ObjectId(id)},
            {$push : {comments : {_id : ObjectId(randomId), id : req.userId._id,name : req.userId.name ,comment : comment,loves:[],replies:[], commentedAt : new Date().toLocaleString()}}})
        
        const finalCom = await memory.findOne({_id: ObjectId(id)} ,{ comments: { $elemMatch: { comment: comment } } })
    } catch (error) {
        console.log(`Comment on memories..${error}`)
    }
}

export const likeComment = async (req,res)=>{
    try {
        const { id } = req.params
        const { id2 } = req.params
             await memory.updateOne({_id : ObjectId(id)},
            {
                $push : { 
                    "comments.$[index].loves" : req.userId._id
                }
            },
            {
                arrayFilters : [{"index._id": ObjectId(id2)}]
            }
            )
            const secondLike = await memory.findOne({_id: ObjectId(id)})
        
    } catch (error) {
        console.log(`Like memories..${error}`)
    }
}

export const replyComment = async (req,res) =>{
    let randomId = crypto.randomBytes(12).toString("hex").toLocaleLowerCase();
    try {
        const { id } = req.params
        const  { id2 } = req.params
        const { reply } = req.body
        await memory.updateOne({_id:ObjectId(id)},
            {$push : {"comments.$[index].replies" : {_id : ObjectId(randomId),
                name : req.userId.name, 
                reply : reply,loves:[],debates:[],
                repliedAt : new Date().toLocaleString()}}
            },
            { arrayFilters: [ { "index._id" : ObjectId(id2) } ] } 
        )
    } catch (error) {
        console.log(`Reply on comment..${error}`)
    }
}

export const likeReply = async (req,res) =>{
    try {
        const { id } = req.params
        const  { id2 } = req.params
        const { id3 } = req.params
        await memory.updateOne({_id:ObjectId(id)},
        {$push : {"comments.$[index].replies.$[index2].loves" : req.userId._id}},
        { arrayFilters : [{"index._id" : ObjectId(id2)},{"index2._id": ObjectId(id3)}]}  
        )
    } catch (error) {
        console.log(`liek Reply..${error}`)
    }
}

export const commentOnReply = async (req,res) =>{
    let randomId = crypto.randomBytes(12).toString("hex").toLocaleLowerCase();
    const { id } = req.params
    const { id2 } = req.params
    const { id3 } = req.params
    const { debate } = req.body
    await memory.updateOne({_id : ObjectId(id)},
    {$push : {"comments.$[index].replies.$[index2].debates": { _id: ObjectId(randomId),
        name : req.userId.name, 
        debate : debate, suporters : []
    }}},
    { arrayFilters : [{"index._id" : ObjectId(id2)},{"index2._id":ObjectId(id3)}]}
    )
}

export const likeDebate = async (req,res) =>{
    try {
        const { id, id2, id3, id4 } = req.params
        
        await memory.updateOne({_id:ObjectId(id)},
        {$push : {"comments.$[index].replies.$[index2].debates.$[index3].suporters" : req.userId._id}},
        { arrayFilters : [{"index._id" : ObjectId(id2)},{"index2._id": ObjectId(id3)},{"index3._id": ObjectId(id4)}]}  //ObjectId
        )
    } catch (error) {
        console.log(`liek Reply..${error}`)
    }
}

export const reportMemo = async (req, res) =>{
    try {
        const { id } = req.params
        const  { report } = req.body
        await memory.updateOne({_id:ObjectId(id)},
        {
            $push : {
                reports : {
                    reporter : req.userId.name,
                    id : req.userId._id,
                    report : report,
                }
            }
        }
        )
    } catch (error) {
        console.log(`Reports...${error}`)
    }
}