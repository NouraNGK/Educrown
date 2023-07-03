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

// Models importation
const User = require("./models/user");

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
const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    "application/pdf": "pdf"
};

const storageImgConfig = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        let error = new Error("Mime type is invalid");
        if (isValid) {
            error = null;
        }
        cb(null, 'backend/images')
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        const imgName = name + '-' + Date.now() + '-crococoder-' + '.' +
            extension;
        cb(null, imgName);
    }
});

const storageCvConfig = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        let error = new Error("Mime type is invalid");
        if (isValid) {
            error = null;
        }
        cb(null, 'backend/documents')
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        const cvName = name + '-' + Date.now() + '-crococoder-' + '.' +
            extension;
        cb(null, cvName);
    }
});


// *****Users*****
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
                if (err.errors.email) {
                    res.json({ msg: "0" });
                }
            } else {
                res.json({ msg: "1" });
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
            if (err) {
                if (err.errors.email) {
                    res.json({ msg: "0" });
                }
            } else {
                res.json({ msg: "1" });
            }
        });
    });
});


// Business Logic: SignupParent (ou add parent)
app.post("/api/users/signupParent", (req, res) => {
    console.log("Here into SignupParent BL", req.body);
    // Check if child number exists or not
    User.findOne({ role: "student", tel: req.body.childNbr}).then(
        (findedStudent) => {
            console.log("Here is the finded student", findedStudent)
            if (findedStudent) {
                bcrypt.hash(req.body.pwd, 8).then((cryptedPwd) => {
                    req.body.pwd = cryptedPwd;
                    let user = new User(req.body);
                    user.save((err, doc) => {
                        if (err) {
                            if (err.errors.email) {
                                res.json({ msg: "0" });
                            }
                        } else {
                            res.json({ msg: "1" });
                        }
                    });
                });
            } else {
                res.json({msg: "Student Not Found"});
            }
        }
    )
});


// Business Logic: SignupAdmin
app.post("/api/users/signupAdmin", multer({ storage: storageImgConfig }).single('img'), (req, res) => {
    console.log("Here into SignupAdmin BL", req.body);
    bcrypt.hash(req.body.pwd, 8).then((cryptedPwd) => {
        req.body.pwd = cryptedPwd;
        req.body.img = `${req.protocol}://${req.get("host")}/myFiles/${req.file.filename}`
        let user = new User(req.body);
        user.save((err, doc) => {
            if (err) {
                if (err.errors.email) {
                    res.json({ msg: "0" });
                }
            } else {
                res.json({ msg: "1" });
            }
        });
    });
});















































// make app exportable to be imported to other files
module.exports = app;