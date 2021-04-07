// add dependencies
const moment = require('moment');
const mongoose = require('mongoose');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');


// add models
const Api_Description = require('../models/Api_Description');
const Users = require('../models/Users');


// add midlewares
const generateAccessToken = require('../middlewares/generateAccessToken');


// fetch api description
exports.FetchApiDescription = (req, res) => {
    if (req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null) {
        var passHmaced = crypto.createHmac('sha256', "HAP").update(req.body.password).digest("hex");
        Users.findOne({ email: req.body.email, password: passHmaced }).then(loginResult => {
            if (loginResult == null) {
                res.status(400).send({
                    code: 400,
                    message: "username or password is wrong"
                })
            } else {
                if (Number(loginResult.lore )== 5) {
                    res.status(403).send({
                        code: 403,
                        message: "Forbidden"
                    })
                } else {
                    const token = generateAccessToken(req.body.email, passHmaced, loginResult._id,loginResult.lore);
                    res.status(200).send({
                        code: 200,
                        message: "fetch user by api description",
                        user: loginResult,
                        token: { jwt: `Bearer ${token}` }
                    })
                }
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
                if (loginResult.lore == 5) {
                    res.status(403).send({
                        code: 403,
                        message: "lore is 5 and not access this section"
                    })
                } else {
                    res.status(200).send({
                        code: 200,
                        message: "fetch user",
                        user: loginResult,
                        token: { jwt: `Bearer ${req.token}`, expire: req.user.exp }
                    })
                }
            }
        }).catch(error => {
            res.status(400).send({
                name: error.name,
                message: error.message
            })
        })
    }
}


// create api description
exports.CreateApiDescription = (req, res) => {
    Api_Description.find().then(apiDescriptionGetResult => {
        if (apiDescriptionGetResult.length <= 0) {
            if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/.test(req.body.password)) {
                req.body.logo = req.file != null ? req.file.filename : "";
                req.body.password = crypto.createHmac('sha256', "HAP").update(req.body.password).digest("hex");
                const apiDes = new Api_Description(req.body);
                const users = new Users({
                    _id: mongoose.Types.ObjectId(),
                    email: req.body.email,
                    password: req.body.password,
                    phoneNumber: req.body.phoneNumber,
                    name: req.body.name,
                    family: req.body.family,
                    lore: 1,
                });
                apiDes.save().then(apiDescriptionPostResult => {
                    users.save().then().catch();
                    res.status(201).send({
                        code: 201,
                        message: "created api info",
                    });
                }).catch(error => {
                    res.status(400).send({
                        name: error.name,
                        message: error.message
                    })
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
                message: "You have a API description filed in DB,you can change it ",
                id: apiDescriptionGetResult[0]._id,
                url: "/api-description/update-api-info"
            })
        }
    })
}


// update api description
exports.UpdateApiDescription = (req, res) => {
    if (req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null) {
        res.status(403).send({
            code: 403,
            message: "Forbidden"
        })
    } else {
        if(Number(req.user.lore) == 1)
        {
            req.body.updatedAt = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
                if (req.file == null) {
                    Api_Description.updateOne({}, req.body).then(apiDescriptionPutResult => {
                        res.status(200).send({
                            code: 200,
                            message: "updated api description",
                            updatedSections: req.body,
                        })
                    }).catch(error => {
                        res.status(400).send({
                            name: error.name,
                            message: error.message
                        })
                    })
                } else {
                    Api_Description.findOne({}).then(findApiDescriptionResult => {
                        fs.unlinkSync(path.resolve(`${__dirname}/../public/uploads/apiDescription/${findApiDescriptionResult.logo}`));
                        req.body.logo = req.file.filename;
                        Api_Description.updateOne({}, req.body).then(apiDescriptionPutResult => {
                            res.status(200).send({
                                code: 200,
                                message: "updated api description",
                                updatedSections: req.body,
                            })
                        }).catch(error => {
                            res.status(400).send({
                                name: error.name,
                                message: error.message
                            })
                        })
                    })
                }
        } else {
            res.status(403).send({
                code: 403,
                message: "Forbidden"
            })
        }
    }
}


// delete api description
exports.deleteApiDescription = (req, res) => {
    if (req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null) {
        res.status(403).send({
            code: 403,
            message: "Forbidden"
        })
    } else {
            if (req.user.lore == 1) {
                mongoose.connection.dropDatabase((error) => {
                    if (error) {
                        res.status(400).send({
                            code: 400,
                            message: "we have a error",
                            error: error
                        })
                    } else {
                        fs.readdir(path.resolve(`${__dirname}+}/../public/uploads/apiDescription`), (err, files) => {
                            for (const file of files) {
                                console.log(file)
                                if(file != "help.txt"){
                                    fs.unlinkSync(path.resolve(`${__dirname}+}/../public/uploads/apiDescription/${file}`))
                                }
                            }
                            res.status(200).send({
                                code: 200,
                                message: "remove database"
                            })
                        });
                    }
                })
            } else {
                res.status(403).send({
                    code: 403,
                    message: "Forbidden"
                })
            }
    }
}