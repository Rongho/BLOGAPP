const UserModel=require('../Model/userMOdel');

const bcrypt=require('bcrypt')

exports.getAllusers=async(req,res)=>{
    try {
        const user=await UserModel.find({});
       return res.status(201).send({
        userCount:user.length,
        success:true,
        message:"user fetched",
        user,
       })
    } catch (error) {
        console.log(error)
    return res.status(500).send({
        success:false,
        message:"Error in getting Callback",
        error
    })
};
}

exports.loginAllusers=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
         return res.status(401).send({
            success:false,
            message:"Incorrect email or password",
         })
        }
        const user=await UserModel.findOne({email})
        if(!user){
            return res.status(401).send({
                success:false,
                message:"email is not registered",
             })
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(401).send({
                success:false,
                message:"Invalid Password",
             })
        }
       return res.status(201).send({
        success:true,
                message:"User loged in",
                user
       })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"Error in getting Callback",
            error
        })
};
}


exports.registerUser=async(req,res)=>{
try {
    const {name,password,email}=req.body;
    if(!name || !password || !email){
    return res.status(401).send({
        success:false,
        message:"Enter all the fields",
    })
    }
    const existingUser=await UserModel.findOne({email});
    if(existingUser){
        return res.status(401).send({
            success:false,
            message:"Already Registered", 
        })
    }
 const HashPassword=await bcrypt.hash(password,10)
    const user=UserModel({name,email,password:HashPassword});
    await user.save();
    return res.status(201).send({
        success:true,
        message:"Registered user",
        user
    })
    
} catch (error) {
    console.log(error)
    return res.status(500).send({
        success:false,
        message:"Error in Register Callback",
        error
    })
}
}