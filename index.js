import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import postsRoute from './routes/posts.js'
import authRouter from './routes/auth'
import profileRoute from './routes/profile'
import chatRouter from './routes/chat'
import {connect} from './config/db/index'
import path from 'path'
import { fileURLToPath } from 'url';
import {} from 'dotenv/config'



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// connect to DB 
connect()



// use middleware
const app = express()
app.use(bodyParser.json({limit:"30mb" , extended : true}))
app.use(bodyParser.urlencoded({limit:"30mb" , extended: true}))
app.use(cors());


app.use('/image',express.static(path.join(__dirname,'/image')))
app.use('/avatar',express.static(path.join(__dirname,'/avatar')))
app.use('/messageImage',express.static(path.join(__dirname,'/messageImage')))



const PORT = process.env.PORT || 5000; 


app.use('/posts',postsRoute)
app.use('/users',authRouter)
app.use('/profile',profileRoute)
app.use('/chat',chatRouter)
app.get('/', function (req, res) {
  res.send('hello meo meo')
})





app.listen(PORT)
console.log('listening on port :http://localhost:5000')