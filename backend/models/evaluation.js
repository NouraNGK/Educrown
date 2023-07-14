// import mongoose module
const mongoose = require("mongoose");

// create evaluation schema
const evaluationSchema = mongoose.Schema({
    courseId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
    studentId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    teacherId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    note: Number,
    comment: String
});

// create Model Name "Evaluation"
const evaluation = mongoose.model("Evaluation", evaluationSchema);

// make evaluation exportable
module.exports = evaluation;