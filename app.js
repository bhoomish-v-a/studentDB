const express=require('express');
const http=require('http');
const loginRoutes=require('./routes/login.js');
const detailsRoutes=require('./routes/details.js');
const path=require('path');
const app=express();
const connectDB = require("./routes/db.js"); 

app.set('view engine','ejs');
app.set('views', './views'); 

app.use(express.json());//middleware
connectDB()

app.use(express.static(path.join(__dirname,'public')));
app.use(loginRoutes);
app.use(detailsRoutes);

app.use('/home',(req,res,next)=>{
    //res.sendFile(path.join(__dirname,'/','views','home.html'));
    res.render('home');
})
app.use((req,res,next)=>{
    //res.sendFile(path.join(__dirname,'/','views','err.html'));
    res.render('err');
})
app.listen(8000);