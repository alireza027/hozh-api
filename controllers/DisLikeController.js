// add dependencies
const moment = require('moment');
const mongoose = require('mongoose');


// add models
const Users = require('../models/Users');
const DisLikes = require('../models/Dis_Likes');


// fetch dislike
exports.FetchDisLike = (req, res) => {
    DisLikes.findOne({ _id: req.params.id }).populate('userId').populate('postId').then(disLikeFindOneResult => {
        res.status(200).send({
            code: 200,
            message: "fetch one dis like by id",
            disLikeFindOneResult
        })
    }).catch(error => {
        res.status(400).send({
            name: error.name,
            message: error.message
        })
    })
};


// fetch all dislike
exports.FetchAllDisLikes =  (req, res) => {
    DisLikes.find().populate('userId').populate('postId').then(disLikesFindAllResults => {
        res.status(200).send({
            code: 200,
            message: "fetch all dis Like ",
            disLikesFindAllResults
        })
    }).catch(error => {
        res.status(400).send({
            name: error.name,
            message: error.message
        })
    })
};


// fetch all and paginate dislikes
exports.FetchAllAndPaginateDisLikes = (req, res) => {
    var page = req.body.page > 0 ? Number(req.body.page) : 1;
    var count = req.body.count > 0 ? (Number(req.body.count) * page) : 10;
    var skip = count - Number(req.body.count);

    DisLikes.findOne({ postId: req.body.postId }).populate('userId').populate('postId').then(disLikesFetchAndPaginateResult => {
        var slicedDisLikes = disLikesFetchAndPaginateResult.disLikes.slice(page == 0 || page == 1 ? 0 : skip, count);
        res.status(200).send({
            code: 200,
            message: "fetch and paginate all posts",
            disLikesFetch: {
                _id: disLikesFetchAndPaginateResult._id,
                userId: disLikesFetchAndPaginateResult.userId,
                userId: disLikesFetchAndPaginateResult.postId,
                createdAt: disLikesFetchAndPaginateResult.createdAt,
                updatedAt: disLikesFetchAndPaginateResult.updatedAt,
                slicedDisLikes,
                countOfDisLike: disLikesFetchAndPaginateResult.disLikes.length,
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
};


// add dislike
exports.AddDisLike = (req, res) => {
    DisLikes.findOne({ postId: req.body.postId, "disLikes.userId": req.body.userId }).then(disLikesFindResult => {
        if (disLikesFindResult == null) {
            DisLikes.updateOne({ postId: req.body.postId }, {
                $push: {
                    disLikes: {
                        _id: mongoose.Types.ObjectId(),
                        userId: req.body.userId,
                        postId: req.body.postId,
                        createdAt: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
                    },
                    userId: req.body.userId,
                },
                updatedAt : moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
            }).then(updateDisLikeAddResults => {
                Users.updateOne({ _id: req.body.userId }, { $push: { disLikes: req.body.documentDisLikeId } }).then().catch();
                res.status(201).json({
                    code: 201,
                    message: "create new dis Like",
                    createDisLike: req.body
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
                message: "you have a dis like this post"
            })
        }
    }).catch(error => {
        res.status(400).send({
            name: error.name,
            message: error.message
        })
    })
};


// delete dislike
exports.DeleteDisLike = (req, res) => {
    DisLikes.findOne({ postId: req.body.postId, "disLikes.userId": req.body.userId }).then(disLikesFindResult => {
        if (disLikesFindResult != null) {
            DisLikes.updateOne({ postId: req.body.postId }, {
                $pull: {
                    disLikes: { userId: req.body.userId },
                    userId: req.body.userId
                },
                updatedAt : moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
            }).then(updateDisLikeDeleteResults => {
                Users.updateOne({ _id: req.body.userId }, { $pull: { disLikes: req.body.documentDisLikeId } }).then().catch();
                res.status(200).json({
                    code: 200,
                    message: "remove selected dis like",
                })
            }).catch(error => {
                res.status(400).send({
                    name: error.name,
                    message: error.message
                })
            })

        } else {
            res.status(400).send("You not dis liked this post");
        }
    }).catch(error => {
        res.status(400).send({
            name: error.name,
            message: error.message
        })
    })
};


// reset dislike
exports.ResetDisLike = (req, res) => {
    DisLikes.updateOne({ postId: req.body.postId }, {
        userId: [],
        disLikes: []
    }).then(disLikesUpdateResult => {
        Users.updateMany({ disLikes: mongoose.Types.ObjectId(req.body.documentDisLikeId) }, { $pull: { disLikes: mongoose.Types.ObjectId(req.body.documentDisLikeId) } }).then().catch();
        res.status(200).send({
            code: 200,
            message: "reset dis like"
        })
    }).catch(error => {
        res.status(400).send({
            name: error.name,
            message: error.message
        })
    })
};


// reset dislikes
exports.ResetDisLikes = (req, res) => {
    DisLikes.updateMany({
        userId: [],
        disLikes: []
    }).then(disLikesUpdateResult => {
        Users.updateMany({}, { disLikes: [] }).then().catch();
        res.status(200).send({
            code: 200,
            message: "reset dis likes"
        })
    }).catch(error => {
        res.status(400).send({
            name: error.name,
            message: error.message
        })
    })
};