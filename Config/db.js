const mongoose=require('mongoose');
const colors=require('colors');

const ConnectDB=async(req,res)=>{
    try {
        await mongoose.connect(process.env.Mongo_Url)
        console.log("Mongoose is connected".bgMagenta)
    } catch (error) {
      console.log(error)        
    }
}
module.exports=ConnectDB;