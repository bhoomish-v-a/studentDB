
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/todoDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    process.exit(1); // Exit the process if connection fails
  }
};

module.exports = connectDB;

















// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// require("dotenv").config();

// app.use(express.json());

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGODB_URL || "mongodb://localhost:27017/todoDB")
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("MongoDB connection failed:", err));

// // Define Schema
// const studentDetails = new mongoose.Schema({
//   name: String,
//   roll_no: {
//     type: Number,
//     required: true,
//   },
//   dept: String,
//   sgpa: Number,
//   cgpa: Number,
// });

// // Create Model
// const Student = mongoose.model("Student", studentDetails);

// // Add Sample Entry
// const stud = new Student({
//   roll_no: 1001,
//   name: "Madison Hyde",
//   dept: "Computer Science",
//   sgpa: 8.7,
//   cgpa: 8.5,
// });
// stud
//   .save()
//   .then(() => console.log("One entry added"))
//   .catch((err) => console.log(err));

// // Define Routes
// app.get("/server", (req, res) => {
//   Student.find({})
//     .then((foundStudents) => res.send(foundStudents))
//     .catch((err) => {
//       console.error("Error occurred while fetching students:", err);
//       res.status(500).send("Some error occurred!");
//     });
// });
// Student.find({})
//   .then((students) => console.log(students))
//   .catch((err) => console.error("Error fetching students:", err));
// // Start Server
// const PORT = process.env.PORT || 3001; // Changed port to 3001
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
