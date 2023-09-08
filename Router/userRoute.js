const express=require('express');

const router=express.Router();

const {getAllusers,loginAllusers,registerUser}=require('../Controller/userControl')

router.get('/getuser',getAllusers);

router.post('/login',loginAllusers);

router.post('/signup',registerUser);

module.exports=router;