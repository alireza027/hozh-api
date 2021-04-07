// add dependencies
const mongoose = require('mongoose');
const moment = require('moment');


// add models
const Bookmarks = require('../models/Bookmarks');
const Users = require('../models/Users');


// fetch one bookmark with user and post
exports.FetchOneBookmarkUser = (req, res) => {
    if (req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null) {
        res.status(403).send({
            code: 403,
            message: "Forbidden"
        })
    } else {
        if(Number(req.user.lore) == 1){
            Bookmarks.findOne({_id:req.params.id}).sort({_id:-1}).populate('userId').populate('postId').then(findOneBookmarkResult=>{
                if(findOneBookmarkResult == null){
                    res.status(400).send({
                        code : 400,
                        message : "bookmark not exists"
                    })
                } else {
                    res.status(200).send({
                        code : 200,
                        message : "find one bookmark by id and userId",
                        bookmark : findOneBookmarkResult
                    })
                }
            }).catch(error => {
                res.status(400).send({
                    name: error.name,
                    message: error.message
                });
            })
        } else {
            Bookmarks.findOne({_id:req.params.id , userId : req.user._id}).sort({_id:-1}).populate('userId').populate('postId').then(findOneBookmarkResult=>{
                if(findOneBookmarkResult == null){
                    res.status(400).send({
                        code : 400,
                        message : "bookmark not exists or Forbidden"
                    })
                } else {
                    res.status(200).send({
                        code : 200,
                        message : "find one bookmark by id and userId",
                        bookmark : findOneBookmarkResult
                    })
                }
            }).catch(error => {
                res.status(400).send({
                    name: error.name,
                    message: error.message
                });
            })
        }
    }
};


// fetch all user bookmark
exports.FetchAllBookmarksUser = (req, res) => {
    Bookmarks.find({userId : req.body.bookmarkUserId}).count((error,countDoc)=>{
        if (req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null) {
                res.status(403).send({
                    code: 403,
                    message: "Forbidden"
                })
            } else {
                if(error){
                    res.status(400).send({
                        name: error.name,
                        message: error.message
                    })
                }else {
                    if(req.body.all == null){
                        var page = req.body.page > 0 ? Number(req.body.page) : 1;
                        var count = req.body.count > 0 ? (Number(req.body.count) * page) : 10;
                        var skip = count - Number(req.body.count);
        
                        if(req.user.lore == 1 && req.body.bookmarkUserId != null){
                            Bookmarks.find({userId : req.body.bookmarkUserId}).sort({_id:-1}).skip(skip).limit(count).populate("userId").populate("postId").then(findBookmarksResult=>{
                                res.status(200).send({
                                    code : 200,
                                    message : "fetch one user bookmarks",
                                    bookmarks : findBookmarksResult,
                                    bookmarksCount : countDoc
                                })
                            }).catch(error=>{
                                res.status(400).send({
                                    name: error.name,
                                    message: error.message
                                })
                            })
                        } else {
                            Bookmarks.find({userId : req.user._id}).sort({_id:-1}).skip(skip).limit(count).populate("userId").populate("postId").then(findBookmarksResult=>{
                                res.status(200).send({
                                    code : 200,
                                    message : "fetch one user bookmarks",
                                    bookmarks : findBookmarksResult,
                                    bookmarksCount : countDoc
                                })
                            }).res.status(400).send({
                                name: error.name,
                                message: error.message
                            });
                        }
                    } else {
                        if(req.user.lore == 1 && req.body.bookmarkUserId != null){
                            Bookmarks.find({userId : req.body.bookmarkUserId}).sort({_id:-1}).populate("userId").populate("postId").then(findBookmarksResult=>{
                                res.status(200).send({
                                    code : 200,
                                    message : "fetch one user bookmarks",
                                    bookmarks : findBookmarksResult,
                                    bookmarksCount : countDoc
                                })
                            }).catch(error=>{
                                res.status(400).send({
                                    name: error.name,
                                    message: error.message
                                })
                            })
                        } else {
                            Bookmarks.find({userId : req.user._id}).sort({_id:-1}).populate("userId").populate("postId").then(findBookmarksResult=>{
                                res.status(200).send({
                                    code : 200,
                                    message : "fetch one user bookmarks",
                                    bookmarks : findBookmarksResult,
                                    bookmarksCount : countDoc
                                })
                            }).catch(error=>{
                                res.status(400).send({
                                    name: error.name,
                                    message: error.message
                                })
                            })
                        }
                    }
                }
            }
    })
    
};


// fetch all user bookmark
exports.FetchAllBookmarksUsers = (req, res) => {
    if (req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null) {
        res.status(403).send({
            code: 403,
            message: "Forbidden"
        })
    } else {
        Bookmarks.countDocuments((error,countDoc)=>{
            if(error){
                res,status(400).send({
                    name : error.name,
                    message : error.message
                })
            } else {
                if(req.body.all == null){
                    var page = req.body.page > 0 ? Number(req.body.page) : 1;
                    var count = req.body.count > 0 ? (Number(req.body.count) * page) : 10;
                    var skip = count - Number(req.body.count);
                    Bookmarks.find({}).sort({_id:-1}).skip(skip).limit(count).populate("userId").populate("postId").then(findBookmarksResult=>{
                        res.status(200).send({
                            code : 200,
                            message : "fetch all users bookmarks",
                            bookmarks : findBookmarksResult,bookmarksCount : countDoc
                        })
                    }).catch(error=>{
                        res.status(400).send({
                            name: error.name,
                            message: error.message
                        })
                    })
                    
                } else {
                    Bookmarks.find({}).sort({_id:-1}).populate("userId").populate("postId").then(findBookmarksResult=>{
                        res.status(200).send({
                            code : 200,
                            message : "fetch all users bookmarks",
                            bookmarks : findBookmarksResult,
                            bookmarksCount : countDoc
                        })
                    }).catch(error=>{
                        res.status(400).send({
                            name: error.name,
                            message: error.message
                        })
                    })
               }
            }
        })
    }
};


// add a bookmark
exports.AddBookmark = (req, res) => {
    if (req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null) {
        res.status(403).send({
            code: 403,
            message: "Forbidden"
        })
    } else {
        Bookmarks.findOne({userId:req.user._id , postId : req.params.postId}).then(findOneBookmarkResult=>{
            if(findOneBookmarkResult == null){
                new Bookmarks({
                    userId : req.user._id,
                    postId : req.params.postId
                }).save().then((addBookmarkResult)=>{
                    Users.updateOne({_id : req.user._id},{$push : {bookmarks:addBookmarkResult._id}}).then().catch();
                    res.status(200).send({
                        code : 200,
                        message : "added new bookmark"
                    })
                }).catch(error=>{
                    res.status(400).send({
                        name: error.name,
                        message: error.message
                    })
                })
            } else {
                res.status(400).send({
                    code : 400,
                    message : "you ,bookmarked this post before"
                })
            }
        })
    }
};


// delete a bookmark
exports.DeleteBookmark = (req, res) => {
    if (req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null) {
        res.status(403).send({
            code: 403,
            message: "Forbidden"
        })
    } else {
        Bookmarks.deleteOne({_id:req.params.id , userId : req.user._id}).then(deleteOneResult=>{
            Users.updateOne({_id : req.user._id , bookmarks : req.params.id},{$pull:{bookmarks : req.params.id}}).then().catch();
            res.status(200).send({
                code : 200,
                message : "delete bookmark"
            })
        }).catch(error=>{
            res.status(400).send({
                name: error.name,
                message: error.message
            })
        })
    }
};


// reset bookmarks
exports.ResetBookmarks = (req, res) => {
    if (req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null) {
        res.status(403).send({
            code: 403,
            message: "Forbidden"
        })
    } else {
        if (Number(req.user.lore) == 1) {
            Bookmarks.deleteMany({}).then(deleteManyBookmarksResult=>{
                Users.updateMany({},{bookmarks : []}).then().catch();
                res.status(200).send({
                    code : 200,
                    message : "delete all bookmarks",
                })
            }).catch(error=>{
                res.status(400).send({
                    name: error.name,
                    message: error.message
                })
            })
        } else {
            res.status(403).send({
                code: 403,
                message: "Forbidden"
            })
        }
    }
};