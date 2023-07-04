// import mongoose module
const mongoose = require("mongoose");

// create course schema
const courseSchema = mongoose.Schema({
    courseName: String,
    duration: Number,
    sessionsNbr: Number,
    sessionDuration: String,
    description: String,
    img: String
});

// create Model Name "Course"
const course = mongoose.model("Course", courseSchema);

// make course exportable
module.exports = course;