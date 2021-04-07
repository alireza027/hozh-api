// add dependencies
const moment = require('moment');


// add models
const Recent_Sees = require("../models/Recent_Sees");


// fetch recent sees
exports.FetchRecentSees = (req, res) => {
    Recent_Sees.findOne({ $or: [{ _id: req.body.id }, { userId: req.body.userId }] }).populate('userId').populate("postId").then(recentSeesFindOneResult => {
        res.status(200).send({
            code: 200,
            message: "fetch one record of recent sees DB",
            recentSeesFindOneResult
        })
    }).catch(error => {
        res.status(400).send({
            name: error.name,
            message: error.message
        })
    })
};


// fetch all recent sees
exports.FetchAllRecentSees = (req, res) => {
    Recent_Sees.find({}).populate('userId').populate("postId").then(recentSeesFindAllResults => {
        res.status(200).send({
            code: 200,
            message: "fetch all record of recent sees DB",
            recentSeesFindAllResults
        })
    }).catch(error => {
        res.status(400).send({
            name: error.name,
            message: error.message
        })
    })
};


// fetch all and paginate recent sees
exports.FetchAllAndPaginateRecentSees =  (req, res) => {
    var page = req.body.page > 0 ? Number(req.body.page) : 1;
    var count = req.body.count > 0 ? (Number(req.body.count) * page) : 10;
    var skip = count - Number(req.body.count);

    Recent_Sees.findOne({ $or: [{ userId: req.body.userId }, { _id: req.body.id }] }).then(recentSeesFindAndPaginateResult => {
        var slicedRecentSees = recentSeesFindAndPaginateResult.postId.slice(page == 0 || page == 1 ? 0 : skip, count);
        res.status(200).send({
            code: 200,
            message: "fetch and paginate recent sees",
            recentSees: {
                _id: recentSeesFindAndPaginateResult._id,
                userId: recentSeesFindAndPaginateResult.userId,
                createdAt: recentSeesFindAndPaginateResult.createdAt,
                updatedAt: recentSeesFindAndPaginateResult.updatedAt,
                slicedRecentSees,
                countOfRecentSees: recentSeesFindAndPaginateResult.postId.length,
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


// add recent sees
exports.AddRecentSees = (req, res) => {
    Recent_Sees.findOne({ userId: req.body.userId, postId: { $in: [req.body.postId] } }).then(recentSessFindOneResult => {
        if (recentSessFindOneResult == null) {
            Recent_Sees.updateOne({ $or: [{ _id: req.body.id }, { userId: req.body.userId }] }, {
                $push: { postId: req.body.postId },
                updatedAt : moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            }).then(updateRecentSeesAddResult => {
                res.status(201).send({
                    code: 201,
                    message: "create new recent sess"
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
                message: "you have same recent sees"
            })
        }
    }).catch(error => {
        res.status(400).send({
            name: error.name,
            message: error.message
        })
    })
};


// delete recent sees
exports.DeleteRecentSees = (req, res) => {
    Recent_Sees.findOne({ userId: req.body.userId, postId: { $in: [req.body.postId] } }).then(recentSessFindOneResult => {
        if (recentSessFindOneResult != null) {
            Recent_Sees.updateOne({ $or: [{ _id: req.body.id }, { userId: req.body.userId }] }, {
                postId: [],
                updatedAt: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
            }).then(updateRecentSeesDeleteResult => {
                res.status(200).send({
                    code: 200,
                    message: "delete one recent sess"
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
                message: "you haven't recent sees"
            })
        }
    }).catch(error => {
        res.status(400).send({
            name: error.name,
            message: error.message
        })
    })
};


// reset recent sees
exports.ResetRecentSees = (req, res) => {
    Recent_Sees.updateOne({ $or: [{ _id: req.body.id }, { userId: req.body.userId }] }, {
        postId: [],
        updatedAt : moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
    }).then(updateRecentSeesDeleteResult => {
        res.status(200).send({
            code: 200,
            message: "reset one recent sess"
        })
    }).catch(error => {
        res.status(400).send({
            name: error.name,
            message: error.message
        })
    })
};


// reset all recentSees
exports.ResetRecentSeeses =  (req, res) => {
    Recent_Sees.updateMany({}, {
        postId: [],
        updatedAt: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
    }).then(updateRecentSeesDeleteResult => {
        res.status(200).send({
            code: 200,
            message: "reset all recent sess"
        })
    }).catch(error => {
        res.status(400).send({
            name: error.name,
            message: error.message
        })
    })
};