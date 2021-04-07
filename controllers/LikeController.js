// add dependencies
const moment = require('moment');
const mongoose = require('mongoose');


// add models
const Users = require('../models/Users');
const Likes = require('../models/Likes');


// fetch like
exports.FetchLike = (req, res) => {
    if (req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null) {
        res.status(403).send({
            code: 403,
            message: "Forbidden"
        })
    } else {
        if(Number(req.user.lore) == 1 || Number(req.user.lore) == 2 ){
            Likes.findOne({ _id: req.params.id }).populate('userId').populate('postId').then(likeFindOneResult => {
                res.status(200).send({
                    code : 200,
                    message : "fetch one user likes",
                    likeFindOneResult
                })
            })
        } else {
            Likes.findOne({ _id: req.params.id,userId:req.user._id }).populate('userId').populate('postId').then(likeFindOneResult => {
                if(likeFindOneResult == null){
                    res.status(403).send({
                        code: 403,
                        message: "Forbidden"
                    })
                } else {
                    res.status(200).send({
                        code: 200,
                        message: "fetch one user likes",
                        likeFindOneResult
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
};


// fetch all likes
exports.FetchAllLikes = (req, res) => {
    if (req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null) {
        res.status(403).send({
            code: 403,
            message: "Forbidden"
        })
    } else {
        if (Number(req.user.lore) == 1 || Number(req.user.lore) == 2) {
            Likes.find().populate('userId').populate('postId').then (likesFindAllResults => {
                res.status(200).send({
                    code: 200,
                    message: "fetch all Like ",
                    likesFindAllResults,
                    lore : req.user.lore
                })
            }).catch(error => {
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


// fetch all and paginate likes one user
exports.FetchAllAndPaginateLikes = (req, res) => {
    var page = req.body.page > 0 ? Number(req.body.page) : 1;
    var count = req.body.count > 0 ? (Number(req.body.count) * page) : 10;
    var skip = count - Number(req.body.count);

    if (req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null) {
        res.status(403).send({
            code: 403,
            message: "Forbidden"
        })
    } else {
        if(Number(req.user.lore) == 1 || Number(req.user.lore) == 2 ){
            Likes.findOne({ _id: req.params.id }).populate('userId').populate('postId').then(LikesFetchAndPaginateResult => {
                var slicedLikes = LikesFetchAndPaginateResult.likes.slice(page == 0 || page == 1 ? 0 : skip, count);
                    res.status(200).send({
                        code: 200,
                        message: "fetch and paginate all posts",
                        likesFetch: {
                            _id: LikesFetchAndPaginateResult._id,
                            userId: LikesFetchAndPaginateResult.userId,
                            userId: LikesFetchAndPaginateResult.postId,
                            createdAt: LikesFetchAndPaginateResult.createdAt,
                            updatedAt: LikesFetchAndPaginateResult.updatedAt,
                            slicedLikes,
                            countOfLike: LikesFetchAndPaginateResult.likes.length,
                            page: Number(req.body.page),
                            count: Number(req.body.count)
                        }
                    })
            }).catch(error => {
                res.status(400).send({
                    name: error.name,
                    message: error.message
                });
            })
        } else {
            Likes.findOne({ _id: req.params.id }).populate('userId').populate('postId').then(LikesFetchAndPaginateResult => {
                if(LikesFetchAndPaginateResult == null){
                    res.status(403).send({
                        code: 403,
                        message: "Forbidden"
                    })
                } else {
                    var slicedLikes = LikesFetchAndPaginateResult.likes.slice(page == 0 || page == 1 ? 0 : skip, count);
                    res.status(200).send({
                        code: 200,
                        message: "fetch and paginate all posts",
                        likesFetch: {
                            _id: LikesFetchAndPaginateResult._id,
                            userId: LikesFetchAndPaginateResult.userId,
                            userId: LikesFetchAndPaginateResult.postId,
                            createdAt: LikesFetchAndPaginateResult.createdAt,
                            updatedAt: LikesFetchAndPaginateResult.updatedAt,
                            slicedLikes,
                            countOfLike: LikesFetchAndPaginateResult.likes.length,
                            page: Number(req.body.page),
                            count: Number(req.body.count)
                        }
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


// add like
exports.AddLike = (req, res) => {
    if (req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null) {
        res.status(403).send({
            code: 403,
            message: "Forbidden"
        })
    } else {
        Likes.findOne({ postId: req.params.postId, "likes.userId": req.user._id }).then(likesFindResult => {
            var _id = mongoose.Types.ObjectId();
            if (likesFindResult == null) {
                Likes.updateOne({ postId: req.params.postId }, {
                    $push: {
                        likes: {
                            _id: _id,
                            userId: req.user._id,
                            postId: req.params.postId,
                            createdAt: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
                        },
                        userId: req.user._id
                    },
                    updatedAt : moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
                }).then(updateLikeAddResults => {
                    Users.updateOne({ _id: req.user._id }, { $push: { likes: _id } }).then().catch();
                    res.status(201).json({
                        code: 201,
                        message: "create new Like",
                    })
                }).catch(error => {
                    res.status(400).send({
                        name: error.name,
                        message: error.message
                    })
                })
            } else {
                res.status(400).send({
                    code: 400,
                    message: "you have a like this post"
                })
            }
        }).catch(error => {
            res.status(400).send({
                name: error.name,
                message: error.message
            })
        })
    }
};


// delete Like
exports.DeleteLike = (req, res) => {
    if (req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null) {
        res.status(403).send({
            code: 403,
            message: "Forbidden"
        })
    } else {
        Likes.findOne({postId : req.params.postId,"likes.userId" : req.user._id}).select('likes').populate('postId',"_id author").then(likesFindResult => {
            if (likesFindResult != null) {
                res.send(likesFindResult);
                // Likes.updateOne({ postId: req.params.postId }, {
                //     $pull: {
                //         likes: { userId: req.user._id },
                //         userId: req.user._id
                //     },
                //     updatedAt : moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
                // }).then(updateLikeDeleteResults => {
                //     Users.updateOne({ _id: req.user._id }, { $pull: { likes: likesFindResult._id } }).then().catch();
                //     res.status(200).json({
                //         code: 200,
                //         message: "remove selected like",
                //     })
                // }).catch(error => {
                //     res.status(400).send({
                //         name: error.name,
                //         message: error.message
                //     })
                // })
            } else {
                res.status(400).send({
                    code: 400,
                    message: "You not liked this post"
                });
            }
        }).catch(error => {
            res.status(400).send({
                name: error.name,
                message: error.message
            })
        })
    }
};


// reset like
exports.ResetLike = (req, res) => {
    if (req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null) {
        res.status(403).send({
            code: 403,
            message: "Forbidden"
        })
    } else {
        if(req.user.lore == 1 || req.user.lore == 2){
            Likes.updateOne({ postId: req.params.postId }, {
                userId: [],
                likes: []
            }).then(likesUpdateResult => {
                Users.updateMany({ likes: mongoose.Types.ObjectId(req.user._id) }, { $pull: { likes: mongoose.Types.ObjectId(req.user._id) } }).then().catch();
                res.status(200).send({
                    code: 200,
                    message: "reset likes"
                })
            }).catch(error => {
                res.status(400).send({
                    name: error.name,
                    message: error.message
                })
            })
        } else {
            Likes.findOne({postId:req.params.postId,"likes.userId":req.user._id}).then(findOneLikeResult=>{
                if(findOneLikeResult == null){
                    res.status(403).send({
                        code: 403,
                        message: "Forbidden"
                    })
                } else {
                    Likes.updateOne({ postId: req.params.postId }, {
                        userId: [],
                        likes: []
                    }).then(likesUpdateResult => {
        
                        Users.updateMany({ likes: mongoose.Types.ObjectId(req.user._id) }, { $pull: { likes: mongoose.Types.ObjectId(req.user._id) } }).then().catch();
                        res.status(200).send({
                            code: 200,
                            message: "reset likes"
                        })
                    }).catch(error => {
                        res.status(400).send({
                            name: error.name,
                            message: error.message
                        })
                    })
                }
            })
        }
    }
};


// reset likes
exports.ResetLikes = (req, res) => {
    if (req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null) {
        res.status(403).send({
            code: 403,
            message: "Forbidden"
        })
    } else {
        if(req.user.lore ==1 || req.user.lore ==2){
            Likes.updateMany({}, {
                userId: [],
                likes: []
            }).then(likesUpdateResult => {
                Users.updateMany({}, { likes: [] }).then().catch();
                res.status(200).send({
                    code: 200,
                    message: "reset likes"
                })
            }).catch(error => {
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