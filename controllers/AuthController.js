// add dependencies
const mongoose = require('mongoose');
const moment = require('moment');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');


// add midlewares
const generateAccessToken = require('../middlewares/generateAccessToken');


// add models
const Users = require('../models/Users');
const Bookmarks = require('../models/Bookmarks');
const Orders = require('../models/Orders');
const Chats = require('../models/Chats');
const Recent_Sees = require('../models/Recent_Sees');


// login user
exports.Login = (req, res) => {
    if (req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null) {
        var passHmaced = crypto.createHmac('sha256', "HAP").update(req.body.password).digest("hex");
        Users.findOne({ email: req.body.email, password: passHmaced }).then(loginResult => {
            if (loginResult == null) {
                res.status(400).send({
                    code: 400,
                    message: "username or password is wrong"
                })
            } else {
                const token = generateAccessToken(req.body.email, passHmaced, loginResult._id, Number(loginResult.lore));
                res.status(200).send({
                    code: 200,
                    message: "fetch user",
                    user: loginResult,
                    token: { jwt: `Bearer ${token}` }
                })
            }
        }).catch(error => {
            res.status(400).send({
                name: error.name,
                message: error.message
            })
        })
    } else {
        Users.findOne({ email: req.user.email, password: req.user.password }).then(loginResult => {
            if (loginResult == null) {
                res.status(400).send({
                    code: 400,
                    message: "username or password is wrong"
                })
            } else {
                res.status(200).send({
                    code: 200,
                    message: "fetch user",
                    user: loginResult,
                    token: { jwt: `Bearer ${req.token}`, expire: req.user.exp }
                })
            }
        }).catch(error => {
            res.status(400).send({
                name: error.name,
                message: error.message
            })
        })
    }
}


// register user
exports.Register = (req, res) => {
    if (req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null) {
        if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/.test(req.body.password)) {
            req.body.password = crypto.createHmac('sha256', "HAP").update(req.body.password).digest("hex")
            req.body.profilePic = req.file != null ? req.file.filename : "";
            req.body._id = mongoose.Types.ObjectId();

            new Users(req.body).save().then(createNewUser => {
                res.status(201).send({
                    code: 201,
                    message: "create new user",
                })
            }).catch(error => {
                res.status(400).send({
                    name: error.name,
                    message: error.message
                });
            })

        } else {
            res.status(400).send({
                name: "Password Error ",
                message: "Password is not a valid format (8 characters and use A-Z a-Z 0-9)"
            })
        }
    } else {
        res.status(400).send({
            code: 400,
            message: "You have a account"
        });
    }
}


// update user
exports.UpdateUser = (req, res) => {
    if (req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null) {
        res.status(403).send({
            code: 403,
            message: "Forbidden"
        })
    } else {
        Users.findOne({_id:{$ne:req.user._id},$or:[{email:req.body.email},{phoneNumber:req.body.phoneNumber}]}).then(findOneUserResult=>{
            if(findOneUserResult == null){
                    if (req.file == null) {
                    Users.updateOne({ _id: req.user._id }, req.body).then(updateUserResult => {
                        req.body.updatedAt = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
                        res.status(200).send({
                            code: 200,
                            message: "update user",
                            updatedSection: req.body
                        })
                    }).catch(error => {
                        res.status(400).send({
                            name: error.name,
                            message: error.message
                        })
                    })
                } else {
                    Users.findOne({ _id: req.user._id }).then(findOneUser => {
                        findOneUser.profilePic != "" && fs.unlinkSync(path.resolve(`${__dirname}/../public/uploads/users/${findOneUser.profilePic}`));

                        req.body.profilePic = req.file.filename;
                        req.body.updatedAt = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

                        Users.updateOne({ _id: req.user._id }, req.body).then(updateUserResult => {
                            res.status(200).send({
                                code: 200,
                                message: "update user",
                                updatedSection: req.body
                            })
                        }).catch(error => {
                            res.status(400).send({
                                name: error.name,
                                message: error.message
                            })
                        })
                    }).catch(error => {
                        res.status(400).send({
                            name: error.name,
                            message: error.message
                        })
                    })
                }
            } else {
                res.status(400).send({
                    code : 400,
                    message : "this email or number already exists"
                })
            }
        }).catch(error=>{
            res.status(400).send({
                name: error.name,
                message: error.message
            })
        })
    }
}


// delete user
exports.DeleteUser = (req, res) => {
    if (req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null) {
        res.status(403).send({
            code: 403,
            message: "Forbidden"
        })
    } else {
        Users.findOne({_id:req.user._id}).then(findOneUserResult=>{
            Users.updateOne({ _id: req.user._id },{role:-1,email:findOneUserResult.email+".deleted",phoneNumber:findOneUserResult.phoneNumber+".delete"}).then(deleteOneUserResult => {
                fs.readdir(path.resolve(`${__dirname}+}/../public/uploads/users`), (err, files) => {
                    for (const file of files) {
                        if(file!="help.txt"){
                            fs.unlinkSync(path.resolve(`${__dirname}+}/../public/uploads/users/${file}`));
                        }
                    }
                    res.status(200).send({
                        code: 200,
                        message: "remove your record"
                    })
                });
            }).catch(error => {
                res.status(400).send({
                    name: error.name,
                    message: error.message
                })
            })
        }).catch(error=>{
            res.status(400).send({
                name: error.name,
                message: error.message
            })
        })
    }
}