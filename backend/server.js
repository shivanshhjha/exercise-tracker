const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const port = process.env.port || 5000

const uri = process.env.ATLAS_URI
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})

app.use(cors)
app.use(express.json())

const connection = mongoose.connection
connection.once('open', ()=>{
    console.log("Connection with MongoDB established")
})

const exerciseRouter = require('./route/exercise') 
const userRouter = require('./route/users')
 
app.use('/exercise', exerciseRouter)
app.use('/user', userRouter)

app.listen(port, ()=>{
    console.log(`Server is running of port ${port}`)
})