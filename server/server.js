import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()

app.use(bodyParser.json({limit:'30mb',extended : true}))
app.use(bodyParser.urlencoded({limit:'30mb',extended : true}))
app.use(express.json())
app.use(cors())

import router from './routes/routers.js'

app.use('/a2mbrothers/memories/v3',router)
app.use('*',(req,res)=>res.send('Not found...!'))

export default app;