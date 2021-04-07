// add dependencies
const moment = require('moment');


// add models
const Menus = require('../models/Menus.js');


// fetch menu
exports.FetchMenu =  (req, res) => {
    Menus.findOne({_id : req.params.id}).populate("children").populate('parent').then(fetchOneMenu=>{
        res.status(200).send({
            code : 200,
            message : "fetch one menu",
            menu : fetchOneMenu
        })
    }).catch(error=>{
        res.status(400).send({
            name: error.name,
            message: error.message
        })
    })
};


// fetch all menus
exports.FetchAllMenus = (req, res) => {
    Menus.find({}).populate('parent').then(fetchAllMenuResult=>{
        res.status(200).send({
            code : 200,
            message : "fetch all menus ",
            menus : fetchAllMenuResult
        })
    }).catch(error=>{
        res.status(400).send({
            name: error.name,
            message: error.message
        })
    })
};


// fetch just type menu and children
exports.FetchJustMenuParent = (req,res)=>{
    Menus.find({type:"menu"}).populate([
        {
            path : "children",
            model:"Menus",
            populate : {
                path:"children",
                model:"Menus",
                populate : {
                    path:"children",
                    model:"Menus",
                    populate : {
                        path:"children",
                        model:"Menus",
                        populate : {
                            path:"children",
                            model:"Menus",
                            populate : {
                                path:"children",
                                model:"Menus"
                            }
                        }
                    }
                }
            }
        }
    ]).then(fetchJustMenusResults=>{
        res.status(200).send({
            code : 200,
            message : "fetch just menus",
            menus : fetchJustMenusResults
        })
    }).catch(error=>{
        res.status(400).send({
            name: error.name,
            message: error.message
        })
    })
};


// add menu
exports.AddMenu = (req, res) => {
    if(req.body.parent != null){
        new Menus({
            text : req.body.text,
            link : req.body.link,
            icon : req.file != null ? req.file.filename : "",
            parent : req.body.parent,
            type : req.body.type,
        }).save().then(createMenuResult=>{
            Menus.updateOne({_id:req.body.parent},{$push:{children:createMenuResult._id}}).then().catch();
            res.status(201).send({
                code : 201,
                messsage : "create menu "
            })
        }).catch(error=>{
            res.status(400).send({
                name: error.name,
                message: error.message
            })
        })
    } 
    else {
        new Menus({
            text : req.body.text,
            link : req.body.link,
            icon : req.file != null ? req.file.filename : "",
            type : req.body.type,
        }).save().then(createMenuResult=>{
            res.status(201).send({
                code : 201,
                messsage : "create menu "
            })
        }).catch(error=>{
            res.status(400).send({
                name: error.name,
                message: error.message
            })
        })
    }
}, (error, req, res, next) => {
    res.status(400).send({ error: error , code : 400 , errorMessage:"multer error"});
};


// update menu
exports.updateMenu = (req, res) => {
    req.body.updatedAt = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    if(req.file != null){
        req.body.icon == req.file.filename; 
        Menus.updateOne({_id:req.params.id},req.body).then(updateMenuResult=>{
            res.status(200).send({
                code : 200,
                message : "update menu"
            })
        }).catch(error=>{
            res.status(400).send({
                name: error.name,
                message: error.message
            })
        })
    } else {
        Menus.updateOne({_id:req.params.id},req.body).then(updateMenuResult=>{
            res.status(200).send({
                code : 200,
                message : "update menu"
            })
        }).catch(error=>{
            res.status(400).send({
                name: error.name,
                message: error.message
            })
        })
    }
}, (error, req, res, next) => {
    res.status(400).send({ error: error , code : 400 , errorMessage:"multer error"});
};


// delete menu
exports.DeleteMenu = (req, res) => {
    Menus.deleteOne({_id:req.params.id}).then(deleteMenuResult=>{
        Menus.updateMany({parent:req.params.id},{$unset:{parent:""}}).then().catch();
        res.status(200).send({
            code : 200,
            message : "delete menu"
        })
    }).catch(error=>{
        res.status(400).send({
            name: error.name,
            message: error.message
        })
    })
};


// delete all menus
exports.DeleteMenus = (req, res) => {
    Menus.deleteMany({}).then(deleteAllMenusResult=>{
        res.status(200).send({
            code : 200,
            message : "delete all main menu "
        })
    }).catch(error=>{
        res.status(400).send({
            name: error.name,
            message: error.message
        })
    })
};
