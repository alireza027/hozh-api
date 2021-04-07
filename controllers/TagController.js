// add dependencies
const moment = require('moment');


// add models
const Tags = require('../models/Tags');


// fetch tag
exports.FetchTag = (req, res) => {
    Tags.findOne({ _id: req.params.id }).then(fetchOneByIdTagsResult => {
        res.status(200).send({
            code: 200,
            message: "fetch one tags by params",
            tags: fetchOneByIdTagsResult
        })
    }).catch(error => {
        res.status(400).send({
            name: error.name,
            message: error.message
        });
    })
};


// fetch all tags
exports.FetchAllTags = (req, res) => {
    Tags.find({}).then(fetchAllTagsResult => {
        res.status(200).send({
            code: 200,
            message: "fetch all tags",
            tags: fetchAllTagsResult
        })
    }).catch(error => {
        res.status(400).send({
            name: error.name,
            message: error.message
        });
    })
};


// add tag
exports.AddTag = (req, res) => {
    new Tags({
        name: req.body.name
    }).save().then(addTagsResult => {
        res.status(201).send({
            code: 201,
            message: "create new tags"
        })
    }).catch(error => {
        res.status(400).send({
            name: error.name,
            message: error.message
        });
    })
};


// update tag
exports.UpdateTag = (req, res) => {
    Tags.updateOne({ _id: req.params.id }, {
        name: req.body.name,
        updatedAt: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
    }).then(updateTagsByIdResult => {
        res.status(200).send({
            code: 200,
            message: "your tags is updated"
        })
    }).catch(error => {
        res.status(400).send({
            name: error.name,
            message: error.message
        });
    })
};


// delete tag
exports.DeleteTag = (req, res) => {
    Tags.deleteOne({ _id: req.params.id }).then(deleteTagsResult => {
        res.status(200).send({
            code: 200,
            message: "your tags is deleted"
        })
    }).catch(error => {
        res.status(400).send({
            name: error.name,
            message: error.message
        });
    })
};


// delete all tags
exports.DeleteTags = (req, res) => {
    Tags.deleteMany({}).then(deleteAllTagsResult => {
        res.status(200).send({
            code: 200,
            message: "delete all tags"
        })
    }).catch(error => {
        res.status(400).send({
            name: error.name,
            message: error.message
        });
    })
};