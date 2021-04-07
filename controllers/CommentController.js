// add dependencies
const mongoose = require('mongoose');
const moment = require('moment');


// add models
const Users = require('../models/Users');
const Comments = require('../models/Comments');
const Posts = require('../models/Posts');


// fetch one comment user
exports.FetchOneCommentUser = (req, res) => {
    if (req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null) {
        res.status(403).send({
            code: 403,
            message: "Forbidden"
        })
    } else {
        Comments.findOne({ _id: req.params.id }).then(findOneCommentResult => {
            res.status(200).send({
                code: 200,
                message: "fetch one comment",
                comment: findOneCommentResult
            })
        }).catch(error => {
            res.status(400).send({
                name: error.name,
                message: error.message
            });
        })
    }
};


// fetch all comments user
exports.FetchAllCommentsUser = (req, res) => {
    Comments.find({ userId: req.params.userId }).count((error, countDoc) => {
        if (req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null) {
            res.status(403).send({
                code: 403,
                message: "Forbidden"
            })
        } else {
            if (error) {
                res.status(400).send({
                    name: error.name,
                    message: error.message
                })
            } else {
                if (req.body.all == null) {
                    var page = req.body.page > 0 ? Number(req.body.page) : 1;
                    var count = req.body.count > 0 ? (Number(req.body.count) * page) : 10;
                    var skip = count - Number(req.body.count);
                    Comments.find({ userId: req.params.userId }).sort({ _id: -1 }).skip(skip).limit(count).populate("userId").populate("postId").populate("likes").populate("disLikes").populate('childernComments').then(commentFindResult => {
                        res.status(200).send({
                            code: 200,
                            message: "fetch one user comments",
                            comments: commentFindResult,
                            countOfComments: countDoc
                        })
                    }).catch(error => {
                        res.status(400).send({
                            name: error.name,
                            message: error.message
                        })
                    })
                } else {
                    Comments.find({ userId: req.params.userId }).sort({ _id: -1 }).populate("userId").populate("postId").populate("likes").populate("disLikes").populate('childernComments').then(commentFindResult => {
                        res.status(200).send({
                            code: 200,
                            message: "fetch one user comments",
                            comments: commentFindResult,
                            countOfComments: countDoc
                        })
                    }).catch(error => {
                        res.status(400).send({
                            name: error.name,
                            message: error.message
                        })
                    })
                }
            }
        }
    })
}


// fetch all comments users
exports.FetchAllCommentsUsers = (req, res) => {
    Comments.find().count((error, countDoc) => {
        if (req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null) {
            res.status(403).send({
                code: 403,
                message: "Forbidden"
            })
        } else {
            if (error) {
                res.status(400).send({
                    name: error.name,
                    message: error.message
                })
            } else {
                if (req.user.lore == 1 || req.user.lore == 2) {
                    if (req.body.all == null) {
                        var page = req.body.page > 0 ? Number(req.body.page) : 1;
                        var count = req.body.count > 0 ? (Number(req.body.count) * page) : 10;
                        var skip = count - Number(req.body.count);
                        Comments.find().sort({ _id: -1 }).skip(skip).limit(count).populate("userId").populate("postId").populate("likes").populate("disLikes").populate('childernComments').then(commentFindResult => {
                            res.status(200).send({
                                code: 200,
                                message: "fetch one user comments",
                                comments: commentFindResult,
                                countOfComments: countDoc
                            })
                        }).catch(error => {
                            res.status(400).send({
                                name: error.name,
                                message: error.message
                            })
                        })
                    } else {
                        Comments.find().sort({ _id: -1 }).populate("userId").populate("postId").populate("likes").populate("disLikes").populate('childernComments').then(commentFindResult => {
                            res.status(200).send({
                                code: 200,
                                message: "fetch one user comments",
                                comments: commentFindResult,
                                countOfComments: countDoc
                            })
                        }).catch(error => {
                            res.status(400).send({
                                name: error.name,
                                message: error.message
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
    })
}


// add comment =====> halle
exports.AddComment = (req, res) => {
    if (req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null) {
        res.status(403).send({
            code: 403,
            message: "Forbidden"
        })
    } else {
        req.body.userId = req.user._id;
        req.body.postId = req.params.postId;
        new Comments(req.body).save().then(addCommentResult => {
            Users.updateOne({ _id: req.user._id }, { $push: { comments: addCommentResult._id } }).then().catch();
            Posts.updateOne({ _id: req.params.postId }, { $push: { comments: addCommentResult._id } }).then().catch();
            if (req.body.parent == null) {
                res.status(201).send({
                    code: 201,
                    message: "add comment"
                })
            } else {
                Comments.updateOne({ _id: req.body.parent }, { $push: { childernComments: addCommentResult._id } }).then().catch()
                res.status(201).send({
                    code: 201,
                    message: "add comment"
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


// add like =====> halle
exports.AddLike = (req, res) => {
    if (req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null) {
        res.status(403).send({
            code: 403,
            message: "Forbidden"
        })
    } else {
        Comments.findOne({ _id: req.params.id, disLikes: { $in: req.user._id } }).then(findOneCommentResult => {
            Comments.updateOne({ _id: req.params.id }, { $push: { likes: req.user._id } }).then().catch();
            if (findOneCommentResult == null) {
                res.status(201).send({
                    code: 201,
                    message: "add like"
                });
            } else {
                Comments.updateOne({ _id: req.params.id }, { $pull: { disLikes: req.user._id } }).then().catch();
                res.status(201).send({
                    code: 201,
                    message: "add like and remove his dislike"
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


// add dislike =====> halle
exports.AddDisLike = (req, res) => {
    if (req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null) {
        res.status(403).send({
            code: 403,
            message: "Forbidden"
        })
    } else {
        Comments.findOne({ _id: req.params.id, likes: { $in: req.user._id } }).then(findOneCommentResult => {
            Comments.updateOne({ _id: req.params.id }, { $push: { disLikes: req.user._id } }).then().catch();
            if (findOneCommentResult == null) {
                res.status(201).send({
                    code: 201,
                    message: "add dis like"
                });
            } else {
                Comments.updateOne({ _id: req.params.id }, { $pull: { likes: req.user._id } }).then().catch();
                res.status(201).send({
                    code: 201,
                    message: "add dis like and remove his like"
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


// add rating =====> halle
exports.AddRating = (req, res) => {
    if (req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null) {
        res.status(403).send({
            code: 403,
            message: "Forbidden"
        })
    } else {
        Comments.findOne({ _id: req.params.id, rating: { $elemMatch: { userId: req.user._id } } }).then(findOneCommentResult => {
            if (req.body.score != null && req.body.score <= 5 && req.body.score >= 1) {
                if (findOneCommentResult == null) {
                    Comments.updateOne({ _id: req.params.id }, {
                        $push: {
                            rating: {
                                userId: req.user._id,
                                score: Number(req.body.score)
                            }
                        }
                    }).then().catch();
                    res.status(201).send({
                        code: 201,
                        message: "add rating"
                    })

                } else {
                    Comments.updateOne({ _id: req.params.id }, { $pull: { rating: { userId: req.user._id } } }).then(updateOneCommentResult => {
                        Comments.updateOne({ _id: req.params.id }, {
                            $push: {
                                rating: {
                                    userId: req.user._id,
                                    score: Number(req.body.score)
                                }
                            }
                        }).then().catch();
                        res.status(200).send({
                            code: 200,
                            message: "update rating"
                        })
                    }).catch();
                }
            } else {
                res.status(400).send({
                    code: 400,
                    message: "score must be (1,2,3,4,5)"
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


// add report =====> halle
exports.AddReport = (req, res) => {
    if (req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null) {
        res.status(403).send({
            code: 403,
            message: "Forbidden"
        })
    } else {
        Comments.findOne({ _id: req.params.id, report: { $elemMatch: { userId: req.user._id } } }).then(findOneCommentReportResult => {
            if (findOneCommentReportResult == null) {
                if (req.body.title != null && req.body.text != null) {
                    var report = {
                        _id: mongoose.Types.ObjectId(),
                        title: req.body.title,
                        text: req.body.text,
                        userId: req.user._id,
                        createdAt: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                    };
                    Comments.updateOne({ _id: req.params.id }, { $push: { report: report } }).then(updateOneAddReportResult => {
                        res.status(201).send({
                            code: 201,
                            message: "create report"
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
                        message: "title and text field is required"
                    })
                }
            } else {
                res.status(400).send({
                    code: 400,
                    message: "you have a report , if you change it must be update"
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


// update comment =====> halle
exports.UpdateComment = (req, res) => {
    if (req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null) {
        res.status(403).send({
            code: 403,
            message: "Forbidden"
        })
    } else {
        req.body.status = 0;
        Comments.updateOne({ _id: req.params.id, userId: req.user._id }, req.body).then(commentUpdateOneResult => {
            res.status(200).send({
                code: 200,
                message: "update comment"
            })
        }).catch(error => {
            res.status(400).send({
                name: error.name,
                message: error.message
            });
        })
    }
}


// update comment when change status =====> balle
exports.UpdateCommentWhenChangeStatus = (req, res) => {
    if (req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null) {
        res.status(403).send({
            code: 403,
            message: "Forbidden"
        })
    } else {
        if (req.body.status == null) {
            res.status(400).send({
                code: 400,
                message: "status field is required"
            })
        } else {
            if (req.user.lore == 1 || req.user.lore == 2) {
                Comments.updateOne({ _id: req.params.id }, { status: req.body.status }).then(commentUpdateOneResult => {
                    res.status(200).send({
                        code: 200,
                        message: "update comment"
                    })
                }).catch(error => {
                    res.status(400).send({
                        name: error.name,
                        message: error.message
                    });
                })
            } else {
                res.status(403).send({
                    code: 403,
                    message: "Forbidden"
                })
            }
        }
    }
}


// update report =====> halle
exports.UpdateReport = (req, res) => {
    if (req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null) {
        res.status(403).send({
            code: 403,
            message: "Forbidden"
        })
    } else {
        if (req.body.title != null && req.body.text != null) {
            var report = {
                _id: mongoose.Types.ObjectId(),
                title: req.body.title,
                text: req.body.text,
                userId: req.user._id,
                createdAt: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            };
            Comments.updateOne({ _id: req.params.id }, { $pull: { report: { userId: req.user._id } } }).then().catch();
            Comments.updateOne({ _id: req.params.id }, { $push: { report: report } }).then().catch();
            res.status(200).send({
                code: 200,
                message: "update report"
            })
        } else {
            res.status(400).send({
                code: 400,
                message: "title and text field is required"
            })
        }
    }
}


// delete comment =====> halle
exports.DeleteComment = (req, res) => {
    if (req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null) {
        res.status(403).send({
            code: 403,
            message: "Forbidden"
        })
    } else {
        Comments.findOne({ _id: req.params.id }).then(findOneCommentResult => {
            if (req.user.lore == 1 || req.user.lore == 2) {
                Comments.deleteOne({ _id: req.params.id }).then(deleteOneCommentResult => {
                    Posts.updateOne({ _id: mongoose.Types.ObjectId(findOneCommentResult.postId) }, { $pull: { comments: req.params.id } }).then().catch();
                    Users.updateOne({ _id: mongoose.Types.ObjectId(findOneCommentResult.userId) }, { $pull: { comments: req.params.id } }).then().catch();
                    res.status(200).send({
                        code: 200,
                        message: "delete comment"
                    })
                }).catch(error => {
                    res.status(400).send({
                        name: error.name,
                        message: error.message
                    })
                })
            } else {
                Comments.findOne({ _id: req.params.id, userId: req.user._id }).then(findOneCommentResult => {
                    if (findOneCommentResult == null) {
                        res.status(403).send({
                            code: 403,
                            message: "Forbidden"
                        })
                    } else {
                        Comments.deleteOne({ _id: req.params.id, userId: req.user._id }).then(deleteOneCommentResult => {
                            Posts.updateOne({ _id: mongoose.Types.ObjectId(findOneCommentResult.postId) }, { $pull: { comments: req.params.id } }).then().catch();
                            Users.updateOne({ _id: mongoose.Types.ObjectId(findOneCommentResult.userId) }, { $pull: { comments: req.params.id } }).then().catch();
                            res.status(200).send({
                                code: 200,
                                message: "delete comment"
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
        }).catch(error => {
            res.status(400).send({
                name: error.name,
                message: error.message
            })
        })
    }
}


// delete like =====> halle
exports.DeleteLike = (req, res) => {
    if (req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null) {
        res.status(403).send({
            code: 403,
            message: "Forbidden"
        })
    } else {
        Comments.updateOne({ _id: req.params.id }, {
            $pull: { likes: req.user._id }
        }).then(commentUpadteOneResult => {
            res.status(200).send({
                code: 200,
                message: "delete like"
            })
        }).catch(error => {
            res.status(400).send({
                name: error.name,
                message: error.message
            });
        })
    }
}


// delete disLike =====> halle
exports.DeleteDisLike = (req, res) => {
    if (req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null) {
        res.status(403).send({
            code: 403,
            message: "Forbidden"
        })
    } else {
        Comments.updateOne({ _id: req.params.id }, {
            $pull: { disLikes: req.user._id }
        }).then(commentUpadteOneResult => {
            res.status(200).send({
                code: 200,
                message: "delete like"
            })
        }).catch(error => {
            res.status(400).send({
                name: error.name,
                message: error.message
            });
        })
    }
}


// delete rating =====> balle
exports.DeleteRating = (req, res) => {
    if (req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null) {
        res.status(403).send({
            code: 403,
            message: "Forbidden"
        })
    } else {
        Comments.updateOne({ _id: req.params.id }, { $pull: { rating: { userId: req.user._id } } }).then(updateOneCommentResult => {
            res.status(200).send({
                code: 200,
                message: "delete rating"
            })
        }).catch(error => {
            res.status(400).send({
                name: error.name,
                message: error.message
            })
        })
    }
}


// delete report =====> halle
exports.DeleteReport = (req, res) => {
    if (req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null) {
        res.status(403).send({
            code: 403,
            message: "Forbidden"
        })
    } else {
        if (req.user.lore == 1 | req.user.lore == 2) {
            Comments.updateOne({ _id: req.params.id }, { $pull: { report: { userId: req.params.userId } } }).then().catch();
            res.status(200).send({
                code: 200,
                message: "delete report"
            })
        } else {
            if (req.user._id == req.params.userId) {
                Comments.updateOne({ _id: req.params.id }, { $pull: { report: { userId: req.params.userId } } }).then().catch();
                res.status(200).send({
                    code: 200,
                    message: "delete report"
                })
            } else {
                res.status(403).send({
                    code: 403,
                    message: "Forbidden"
                })
            }
        }
    }
}

// reset comments
exports.ResetComments = (req, res) => {
    if (req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null) {
        res.status(403).send({
            code: 403,
            message: "Forbidden"
        })
    } else {
        if (req.user.lore == 1 || req.user.lore == 2) {
            Comments.deleteMany().then(deleteManuCommentResult => {
                Users.updateMany({}, { comments: [] }).then().catch();
                Posts.updateMany({}, { comments: [] }).then().catch();
                res.status(200).send({
                    code: 200,
                    message: "delete all comment and remove id's in the posts and users"
                })
            }).catch(error => {
                res.status(403).send({
                    code: 403,
                    message: "Forbidden"
                })
            })
        } else {
            res.status(403).send({
                code: 403,
                message: "Forbidden"
            })
        }
    }
}