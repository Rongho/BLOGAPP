const blogModel=require('../Model/blogModel')
const UserModel=require('../Model/userMOdel');
const mongoose=require('mongoose')
exports.getAllblog=async(req,res)=>{
try {
    const blogs=await blogModel.find({}).populate("user"); 
    if(!blogs){
        return res.status(200).send({
            success:false,
            message:"error in getting blogs"
        });
    }
    return res.status(201).send({
        blogCount:blogs.length,
   success:true,
   message:"blogs mail",
   blogs
    })
} catch (error) {
    console.log(error)
        return res.status(500).send({
            success:false,
            message:"Error in getting Callback",
            error
        })
}
}

exports.createBlog=async(req,res)=>{
try {
    const {title,description,image,user}=req.body;
    if(!title || !description || !image || !user){
        return res.status(401).send({
            success:false,
            message:"Error in creating blogs",
        })
    }
    const existinguser=await UserModel.findById(user);
    if(!existinguser){
        return res.status(401).send({
            success:false,
            message:"unable to find user"
        })
    }
    const newBlog=new blogModel({title,description,image,user})
    const session=await mongoose.startSession();
    session.startTransaction()
    await newBlog.save({session})
    existinguser.blogs.push(newBlog)
    await existinguser.save({session});
    await session.commitTransaction();
    await newBlog.save();
    return res.status(201).send({
        success:true,
        message:"Blogs created",
        newBlog
    })
} catch (error) {
    console.log(error)
    return res.status(500).send({
        success:false,
        message:"Error in creating Callback",
        error
    }) 
}
}

exports.updateBlogbyId=async(req,res)=>{
 try {
    const {id}=req.params;
    const {title,description,image}=req.body;
    const updatedBlog=await blogModel.findByIdAndUpdate(id,{...req.body},{new:true})
    return res.status(201).send({
        success:true,
        message:"Blog updated",
        updatedBlog
    })
 } catch (error) {
    console.log(error)
    return res.status(500).send({
        success:false,
        message:"Error in updating Callback",
        error
    }) 
 }
}

exports.getBlogbyId=async(req,res)=>{
try {
    const {id}=req.params;
    const getblog=await blogModel.findById(id)
    if(!getblog){
        return res.status(401).send({
            success:false,
            message:"id not matching"
        })
    }
    return res.status(201).send({
        success:true,
        message:"blog fetched by ID",
        getblog
    })
} catch (error) {
    console.log(error)
    return res.status(500).send({
        success:false,
        message:"Error in fetching blog by id",
        error
    }) 
}
}
exports.deletBlog=async(req,res)=>{
try {
  const blog=await blogModel.findByIdAndDelete(req.params.id).populate("user");
  await blog.user.blogs.pull(blog);
  await blog.user.save();
  return res.status(201).send({
    success:true,
    message:"blog deleted"
  })  
} catch (error) {
    console.log(error)
    return res.status(500).send({
        success:false,
        message:"Error in fetching blog by id",
        error  
    }) 
}
}
exports.getBlogbyUser=async(req,res)=>{
    try {
        const userblog=await UserModel.findById(req.params.id).populate("blogs");
        if(!userblog){
            return res.status(500).send({
                success:false,
            message:"user id not matching"
            })
        }
        return res.status(201).send({
            success:true,
            message:"fetched blogs using userId",
            userblog
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"Error in fetching blog by id",
            error  
        })  
    }
}