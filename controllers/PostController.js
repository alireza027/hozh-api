// add dependencies
const mongoose = require('mongoose');
const moment = require('moment');


// add models
const Posts = require('../models/Posts');
// const Comments = require('../models/Comments');
// const Likes = require('../models/Likes');
// const DisLikes = require('../models/Dis_Likes');


// fetch post
exports.FetchPost = (req, res) => {
    Posts.findOne({ _id: req.params.id }).populate('comments').populate('likes').populate('disLikes').then(postFetchOneResult => {
        res.status(200).send({
            code: 200,
            message: "fetch post by id",
            postFetchOneResult
        });
    }).catch(error => {
        res.status(400).send({
            name: error.name,
            message: error.message
        })
    })
};


// fetch all posts
exports.FetchAllPosts = (req, res) => {
    Posts.find().populate('comments').populate('likes').populate('dis_Likes').then(postFetchOneResult => {
        res.status(200).send({
            code: 200,
            message: "fetch all post ",
            postFetchOneResult
        });
    }).catch(error => {
        res.status(400).send({
            name: error.name,
            message: error.message
        })
    })
};


// fetch all and paginate posts
exports.FetchAllAndPaginatePosts = (req, res) => {
    Posts.find().skip(Number(req.body.page)).limit(Number(req.body.limit)).populate('comments').populate('likes').populate('Dis_Likes').then(postsFetchAndPaginateResult => {
        res.status(200).send({
            code: 200,
            message: "fetch and paginate all posts",
            posts: postsFetchAndPaginateResult
        })
    }).catch(error => {
        res.status(400).send({
            name: error.name,
            message: error.message
        });
    })
};


// add post 
exports.AddPost = (req, res) => {
    req.body._id = mongoose.Types.ObjectId();
    req.body.author = req.user._id;
    var newPost = new Posts(req.body);

    newPost.save().then(createPostResult => {
        res.status(201).send({
            code: 201,
            message: "create new post",
            createdSection: createPostResult
        })
    }).catch(error => {
        res.status(400).send({
            name: error.name,
            message: error.message
        })
    })
};


// update posts
exports.UpdatePost = (req, res) => {
    req.body.updatedAt = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    Posts.updateOne({ _id: req.params.id }, req.body).then(updatePostResult => {
        res.status(200).send({
            code: 200,
            message: "updated post",
            updatedSections: req.body
        })
    }).catch(error => {
        res.status(400).send({
            name: error.name,
            message: error.message
        })
    })
};


// delete post
exports.DeletePost = (req, res) => {
    res.status(200).send("delete-post - DELETE");
};


// reset posts
exports.ResetPosts = (req, res) => {
    res.status(200).send("delete-posts - DELETE");
};