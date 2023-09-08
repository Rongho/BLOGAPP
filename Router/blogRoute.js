const express=require('express');

const router=express.Router();

const {getAllblog,createBlog,updateBlogbyId,getBlogbyId,deletBlog,getBlogbyUser}=require('../Controller/blogController')

router.get('/get-blog',getAllblog);

router.post('/create-blog',createBlog);

router.put('/update-blog/:id',updateBlogbyId);

router.get('/getblog/:id',getBlogbyId);

router.delete('/delete-blog/:id',deletBlog);

router.get('/get-userblog/:id',getBlogbyUser)

module.exports=router;