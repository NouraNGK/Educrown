// import express module
const express = require("express");

// import body-parser module
const bodyParser = require("body-parser");

// import bcrypt module
const bcrypt = require("bcrypt");

// import multer module
const multer = require("multer");

// import path module
const path = require("path");

// import axios module
const axios = require("axios");

// import jwt module
const jwt = require('jsonwebtoken');

// import express-session module
const session = require('express-session');

// import mongoose module
const mongoose = require("mongoose");
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://127.0.0.1:27017/educrownDB');

// Import ObjectID
const { ObjectId } = require("mongodb");

// Models importation
const User = require("./models/user");
const Course = require("./models/course");
const Affectation = require("./models/affectation");

// creates express application
const app = express();

// application config: configuration standard du body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Security configuration de l'app express pour qu'elle accepte les méthodes listées ci-dessous // ou bien on installe le package "cors"
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, Accept, Content-Type, X-Requested-with, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );
    next();
});

const secretKey = "edu23";
app.use(
    session({
        secret: secretKey,
    })
);

// Shortcut Path
app.use('/myFiles', express.static(path.join('backend/images')));
app.use('/myDocuments', express.static(path.join('backend/documents')));

// Media Types that we can accept in the BE side
const MIME_TYPE_IMG = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};

const MIME_TYPE_CV = {
    "application/pdf": "pdf"
}

const storageImgConfig = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_IMG[file.mimetype];
        let error = new Error("Mime type is invalid");
        if (isValid) {
            error = null;
        }
        cb(null, 'backend/images')
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE_IMG[file.mimetype];
        const imgName = name + '-' + Date.now() + '-crococoder-' + '.' +
            extension;
        cb(null, imgName);
    }
});

const storageCvConfig = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_CV[file.mimetype];
        let error = new Error("Mime type is invalid");
        if (isValid) {
            error = null;
        }
        cb(null, 'backend/documents')
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE_CV[file.mimetype];
        const cvName = name + '-' + Date.now() + '-crococoder-' + '.' +
            extension;
        cb(null, cvName);
    }
});


// **********Users********** 

// response : 0 => Tel and Email Errors
// response : 1 => Tel Error
// response : 2 => Email Error
// response : 3 => Success
// response : 4 => Tel Child not found (SignupParent)

// Business Logic: SignupTeacher (ou add teacher)
app.post("/api/users/signupTeacher", multer({ storage: storageCvConfig }).single('cv'), (req, res) => {
    console.log("Here into SignupTeacher BL", req.body);
    bcrypt.hash(req.body.pwd, 8).then((cryptedPwd) => {
        req.body.pwd = cryptedPwd;
        req.body.cv = `${req.protocol}://${req.get("host")}/myDocuments/${req.file.filename}`
        let user = new User(req.body);
        user.save((err, doc) => {
            // console.log("Here error", err);
            // console.log("Success", doc);
            if (err) {
                if (err.errors.tel && err.errors.email) {
                    res.json({ msg: "0" });
                } else if (err.errors.tel) {
                    res.json({ msg: "1" });
                } else if (err.errors.email) {
                    res.json({ msg: "2" });
                }
            } else {
                res.json({ msg: "3" });
            }
        });
    });
});


// Business Logic: SignupStudent (ou add student)
app.post("/api/users/signupStudent", multer({ storage: storageImgConfig }).single('avatar'), (req, res) => {
    console.log("Here into SignupStudent BL", req.body);
    bcrypt.hash(req.body.pwd, 8).then((cryptedPwd) => {
        req.body.pwd = cryptedPwd;
        req.body.avatar = `${req.protocol}://${req.get("host")}/myFiles/${req.file.filename}`
        let user = new User(req.body);
        user.save((err, doc) => {
            // console.log("Here error", err);
            // console.log("Success", doc);
            if (err) {
                if (err.errors.tel && err.errors.email) {
                    res.json({ msg: "0" });
                } else if (err.errors.tel) {
                    res.json({ msg: "1" });
                } else if (err.errors.email) {
                    res.json({ msg: "2" });
                }
            } else {
                res.json({ msg: "3" });
            }
        });
    });
});


// Business Logic: SignupParent (ou add parent)
app.post("/api/users/signupParent", (req, res) => {
    console.log("Here into SignupParent BL", req.body);
    // Check if child number exists or not
    User.findOne({ role: "student", tel: req.body.childNbr }).then(
        (findedStudent) => {
            console.log("Here is the finded student", findedStudent)
            if (findedStudent) {
                bcrypt.hash(req.body.pwd, 8).then((cryptedPwd) => {
                    req.body.pwd = cryptedPwd;
                    let user = new User(req.body);
                    user.save((err, doc) => {
                        // console.log("Here error", err);
                        // console.log("Success", doc);
                        if (err) {
                            if (err.errors.tel && err.errors.email) {
                                res.json({ msg: "0" });
                            } else if (err.errors.tel) {
                                res.json({ msg: "1" });
                            } else if (err.errors.email) {
                                res.json({ msg: "2" });
                            }
                        } else {
                            res.json({ msg: "3" });
                        }
                    });
                });
            } else {
                res.json({ msg: "4" });
            }
        }
    )
});


// Business Logic: SignupAdmin
app.post("/api/users/signupAdmin", multer({ storage: storageImgConfig }).single('avatar'), (req, res) => {
    console.log("Here into SignupAdmin BL", req.body);
    bcrypt.hash(req.body.pwd, 8).then((cryptedPwd) => {
        req.body.pwd = cryptedPwd;
        req.body.avatar = `${req.protocol}://${req.get("host")}/myFiles/${req.file.filename}`
        let user = new User(req.body);
        user.save((err, doc) => {
            // console.log("Here error", err);
            // console.log("Success", doc);
            if (err) {
                if (err.errors.tel && err.errors.email) {
                    res.json({ msg: "0" });
                } else if (err.errors.tel) {
                    res.json({ msg: "1" });
                } else if (err.errors.email) {
                    res.json({ msg: "2" });
                }
            } else {
                res.json({ msg: "3" });
            }
        });
    });
});


// Business Logic: Login
// response : 0 => Tel Error
// response : 1 => Pwd Error
// response : 2 => Teacher account must be approved by admin
// response : 3 => Success

app.post("/api/users/login", (req, res) => {
    console.log("Here Into BL: Login", req.body);
    let user;
    // Check if Tel exists
    User.findOne({ tel: req.body.tel })
        .then((doc) => {
            console.log("Here doc", doc);
            user = doc;
            // Send Tel error msg
            if (!doc) {
                res.json({ msg: "0" });
            } else {
                // Check Pwd
                return bcrypt.compare(req.body.pwd, doc.pwd);
            }
        })
        .then((isEqual) => {
            console.log("Here isEqual", isEqual);
            // Send Pwd Error Msg
            if (!isEqual) {
                res.json({ msg: "1" });
            } else {
                if (user.role == "teacher" && user.status == "on hold") {
                    res.json({ msg: "2" });
                } else if ((user.role == "teacher" && user.status == "confirmed")
                    || user.role !== "teacher") {
                    let userToSend = {
                        userId: user._id,
                        email: user.email,
                        fName: user.firstName,
                        lName: user.lastName,
                        role: user.role
                    };
                    const token = jwt.sign(userToSend, secretKey, {
                        expiresIn: '1h',
                    });
                    res.json({ user: token, msg: `3` });
                }
            }
        });
});


// Business Logic : Get all teachers exept those with status on hold
app.get("/api/users/teachers", (req, res) => {
    User.find({ role: "teacher" }).then((data) => {
        res.json({ docs: data, msg: "ok" });
    });
});


// Business Logic: Confirm teacher by Id
app.get("/api/users/confirmTeacher/:id", (req, res) => {
    console.log("Here is the ID of the teacher to confirm", req.params.id);
    User.updateOne({ _id: req.params.id }, { status: "confirmed" }).then(
        (response) => {
            if (response.nModified == 1) {
                res.json({ msg: "1" });
            } else {
                res.json({ msg: "0" });
            }
        });
});


// Business Logic: Delete user by ID
app.delete("/api/users/:id", (req, res) => {
    console.log("Here into BL: delete user by id", req.params.id);
    User.deleteOne({ _id: req.params.id }).then((response) => {
        response.deletedCount == 1
            ? res.json({ msg: "1" })
            : res.json({ msg: "0" })
    });
});


//   Business Logic: Get All Students
app.get("/api/users/students", (req, res) => {
    User.find({ role: "student" }).then(
        (data) => {
            res.json({ docs: data, msg: "ok" });
        });
});


//   Business Logic: Get All Parents
app.get("/api/users/parents", (req, res) => {
    User.find({ role: "parent" }).then(
        (data) => {
            res.json({ docs: data, msg: "ok" });
        });
});


//   Business Logic: Get User By Id
app.get("/api/users/:id", (req, res) => {
    console.log("Here is user Id", req.params.id);
    User.findOne({ _id: req.params.id }).then(
        (doc) => {
            res.json({ user: doc });
        });
});

//   Business Logic: Assign a student to a course
// msg: "0" => Student is already assigned to this course
// msg: "1" => Student assigned with success to the course
app.post("/api/users", (req, res) => {
    console.log("Here is the affectation Object", req.body);
    Affectation.findOne({ courseId: req.body.courseId, studentId: req.body.studentId }).then(
        (doc) => {
            if (doc) {
                res.json({ msg: "0" });
            } else {
                let affectation = new Affectation({
                    courseId: ObjectId(req.body.courseId),
                    studentId: ObjectId(req.body.studentId),
                });
                affectation.save((err, result) => {
                    console.log("Error", err);
                    if (result) {
                        res.json({ msg: "1" });
                    }
                });
            }
        });
});

//   Business Logic: Get affected students by courseId
app.get("/api/users/affectedSrudents/:id", (req, res) => {
    console.log("Here is ID course:", req.params.id);
    Affectation.aggregate([
        { $match: { courseId: mongoose.Types.ObjectId(req.params.id) } },
        {
            $lookup: {
                from: "users",
                localField: "studentId",
                foreignField: "_id",
                as: "students",
            },
        },
    ],
        (error, docs) => {
            if (docs) {
                console.log("Here are the BE docs:", docs);
                res.json({ students: docs, msg: "1" });
            } else {
                res.json({ msg: "0" });
            }
        }
    )
});







// **********Courses********** 

// Business Logic: Add Course
app.post("/api/courses", multer({ storage: storageImgConfig }).single('img'), (req, res) => {
    console.log("Here into BL: Add course", req.body);
    req.body.img = `${req.protocol}://${req.get("host")}/myFiles/${req.file.filename}`;
    let obj = new Course(req.body);
    obj.save();
    res.json({ msg: "ok" });
});

// Business Logic: Get all courses
app.get("/api/courses", (req, res) => {
    Course.find().then((docs) => {
        res.json({ allCourses: docs });
    });
});

// Business Logic: Delete One Course
app.delete("/api/courses/:id", (req, res) => {
    console.log("Here is course ID to delete", req.params.id);
    Course.deleteOne({ _id: req.params.id }).then(
        (response) => {
            response.deletedCount == 1
                ? res.json({ msg: "1" })
                : res.json({ msg: "0" })
        });
});

//   Business Logic: Get Course By Id
app.get("/api/courses/:id", (req, res) => {
    console.log("Here is course ID", req.params.id);
    Course.findOne({ _id: req.params.id }).then(
        (doc) => {
            res.json({ course: doc });
        });
});

//   Business Logic: Get Courses By IdUser
app.get("/api/courses/myCourses/:id", (req, res) => {
    Course.find({ idTeacher: req.params.id }).then(
        (docs) => {
            res.json({ findedCourses: docs });
        });
});













































// make app exportable to be imported to other files
module.exports = app;