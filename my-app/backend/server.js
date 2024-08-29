import express from 'express'
import mongoose from 'mongoose';
import bodyParser from 'express'
import userRouter from './Controller/User.js'
import cors from 'cors'


const app = express();

app.use(bodyParser.json())
app.use(cors({
    origin:true,
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
   
  }))
app.use('/api', userRouter)

mongoose.connect("mongodb+srv://Root:12345@cluster0.g30p78k.mongodb.net/"
    ,{ dbName:"MyAPP" }
).then(()=>console.log("Mongodb is connected")) .catch((err) => console.log(err.message));





const port = 3000;

app.listen(port, () =>console.log('server is running on port ${port}'))