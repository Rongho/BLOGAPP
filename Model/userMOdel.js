const mongoose=require('mongoose');


const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"error in name"],
    },
    email:{
        type:String,
        required:[true,"error in email"],
    },
    password:{
        type:String,
        required:[true,"error in password"],
    },  
    blogs:[
        {
        type:mongoose.Types.ObjectId,
        ref:'blog',
        }
    ]
},{timestamps:true})

const userMOdel= mongoose.model("User",UserSchema);

module.exports=userMOdel;