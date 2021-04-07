// add dependenceis
const mongoose = require('mongoose');
const moment = require('moment');


// add models
const Views = require('../models/Views');


// fetch view
exports.FetchView = (req, res) => {
    Views.find({}).then(fetchViewsResult => {
        res.status(200).send({
            code: 200,
            message: "fetch site views",
            fetchViewsResult
        })
    }).catch(error => {
        res.status(400).send({
            name: error.name,
            message: error.message
        })
    })
};


// add view
exports.AddView = (req, res) => {
    Views.updateOne({}, {
        $push: {
            views: {
                _id: mongoose.Types.ObjectId(),
                ip: req.ip,
                time: moment(new Date()).format("HH:mm:ss"),
                date: moment(new Date()).format("YYYY-MM-DD"),
                url: req.body.url != null ? req.body.url : '/'
            }
        },
        updatedAt : moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
    }).then(addNewViewResult => {
        res.status(200).send({
            code: 200,
            message: "create new view"
        })
    }).catch(error => {
        res.status(400).send({
            name: error.name,
            message: error.message
        })
    })
};


// reset views
exports.ResetViews = (req, res) => {
    Views.updateOne({}, {
        views: []
    }).then(resetViewsResult => {
        res.status(200).send({
            code: 200,
            message: "reset views",
        })
    }).catch(error => {
        res.status(400).send({
            name: error.name,
            message: error.message
        })
    })
};