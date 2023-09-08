const express=require('express');
const cors=require('cors');
const dotenv=require('dotenv');
const morgan=require('morgan');
const colors=require('colors');
const path=require('path')
const ConnectDB=require('./Config/db')

dotenv.config();

const UserRoute=require('./Router/userRoute')
const BlogRoute=require('./Router/blogRoute')

ConnectDB();

const app=express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname,'./cient/build')))
app.use('/api/auth',UserRoute)
app.use('/api/auth',BlogRoute)


PORT=process.env.PORT||8080;



app.listen(PORT,()=>{
    console.log('server started on port'.bgBlue);
})
// ugUqaxY1yPfQCD7k