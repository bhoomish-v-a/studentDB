const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const Student = require('../models/schema');

// Middleware for parsing request body
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/update_details', async(req,res)=>{
  const { name, roll_no, dept, sgpa, cgpa } = req.body;

  try{
    const updateStudent = await Student.updateOne({ roll_no : roll_no },{
      name:name,dept:dept,sgpa:sgpa,cgpa:cgpa
    });
    if(updateStudent.matchedCount === 0) {
      res.render('update',{message:"Student record not found",color:'red'});
  }
    else if (updateStudent) {
      res.render('update',{message:"Record updated successfully",color:'green'}); // Redirect to the student list page
  } 
  else  {
    res.render('update',{message:null,color:null});
}
  }
  catch(error){
    res.render('update',{message:error,color:'red'});
  }
 

});


router.post('/delete_details', async(req,res)=>{
  const { roll_no } = req.body;

  try{
    const deletedStudent = await Student.findOneAndDelete({ roll_no });
    if (deletedStudent) {
      res.render('delete',{message:"Record deleted successfully",color:'green'}); // Redirect to the student list page
  } else if(!deletedStudent) {
      res.render('delete',{message:"Student record not found",color:'red'});
  }
  else  {
    res.render('delete',{message:null,color:null});
}
  }
  catch(error){
    res.render('delete',{message:error,color:'red'});
  }
 

});

// Route to insert student data
router.post('/add_details', async (req, res) => {
  const { name, roll_no, dept, sgpa, cgpa } = req.body;

  try {
    const newStudent = new Student({
      name,
      roll_no,
      dept,
      sgpa,
      cgpa,
    });

    const savedStudent = await newStudent.save();
    console.log('Student data saved:', savedStudent);
    res.render('student_details',{message:null});
  } 
  
  catch (error) {
    
    

    if (error.code === 11000) { // Duplicate key error
      res.render('student_details',{message:"User already exist"});
    } 
    else {
      res.render('student_details',{message:error});
    }
  }
});



// Route for adding student details and rendering updated list
router.use("/student_details", async (req, res) => {
  res.render('student_details',{message:null});

});

router.use("/update", async (req, res) => {
  res.render('update',{message:null,color:'green'});

});
router.use("/delete", async (req, res) => {
  res.render('delete',{message:null,color:null});
});

router.get('/view', async (req, res) => {
  try {
      const students = await Student.find(); // Fetch all students from the database
      res.render('view', { students }); // Render the view and pass student data
  } catch (error) {
      console.error('Error fetching student data:', error);
      res.status(500).send('An error occurred while fetching student data.');
  }
});



module.exports = router;
