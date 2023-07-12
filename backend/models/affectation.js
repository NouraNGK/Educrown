// import mongoose module
const mongoose = require("mongoose");

// create affectation schema
const affectationSchema = mongoose.Schema({
    courseId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
    studentId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
});

// create Model Name "Affectation"
const affectation = mongoose.model("Affectation", affectationSchema);

// make affectation exportable
module.exports = affectation;