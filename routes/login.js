const express=require('express');
const router=express.Router();
const path=require('path');
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const user=[];

router.use('/login',async(req,res)=>{
    console.log('login');
    //res.sendFile(path.join(__dirname,'../','views','login.html'));
    res.render('login',{ message: null });
});
router.post('/loginCheck',(req,res)=>{
    const {username,password}=req.body;
    const exist=user.find((user) => user.username === username&& user.password===password);
    if((username==='bhoomi'&&password==='1')||(exist)){
        res.redirect('/student_details')
    }
    else{
        res.render('login',{message:"invalid username or password"});
    }
  });



router.use('/signin',(req,res,next)=>{
    res.render('signin');
    console.log('signin');
});
router.post("/signinCheck",(req,res)=>{
    const {username,password,comfirm_password,email,phone,roll_number}=req.body;
    console.log(user);
    console.log(username);
    
    const exist=user.find((user) => user.username === username);
    console.log(exist);
    if(exist){
        console.log("user already exist");
        res.redirect('/login')
    }  
    else{
        console.log("user not already exist");
        user.push({ username, password });
        res.redirect('/login')
    }
});

module.exports=router;