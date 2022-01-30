import app from './server.js'
import dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT || 8080

import mongodb from 'mongodb'
import { injectDB } from './api/memories.js'
import { injectdbUser } from './api/users.js'

const monClient = mongodb.MongoClient

monClient.connect(process.env.DB_SYSTEM,{ useNewUrlParser: true, useUnifiedTopology: true})
.catch(e=>{
    console.log(`BigMother_DB...${e}`)
})
.then(async client=>{
    await injectDB(client)
    await injectdbUser(client)    
    app.listen(port,()=>console.log(`Website is ready on http://localhost:${port}/a2mbrothers/memories/v3`))
})