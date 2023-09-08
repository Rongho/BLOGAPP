const mongoose=require('mongoose');

const BlogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"title is required"]
    },
    description:{
        type:String,
        required:[true,"desciption is required"]
    },
    image:{
        type:String,
        required:[true,"image is required"] 
    },
    user:{
      type:mongoose.Types.ObjectId,
      ref:'User',
      required:[true,"user id is required"] 
    }
},{timestamps:true})

const BlogMOdel=mongoose.model('blog',BlogSchema);

module.exports=BlogMOdel;