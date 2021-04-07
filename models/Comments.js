const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;
const Comments = new Schema({
    postId: { type: mongoose.Types.ObjectId, ref: "Posts" },
    userId: { type: mongoose.Types.ObjectId, ref: "Users" },
    likes : [{ type : mongoose.Types.ObjectId , ref : "Users" }],
    disLikes : [{ type : mongoose.Types.ObjectId , ref : "Users" }],
    childernComments : [{ type : mongoose.Types.ObjectId , ref : "Comments"}],
    subject: { type: String },
    // comment - answer
    commentMessage: {
        type: String,
        required: [true, "comment field is required"],
        minlength: [1, "comment field must be more than 1 characters long"],
        maxlength: [250, "comment field must be less than 250 characters long"],
    },
    report: {
        type: Array,
        default: []
    },
    rating : {
        type : Array,
        default : []
    },
    // 0 not published - 1 published
    status : {
        type : String,
        default : 0
    },
    createdAt: {
        type: String,
        default: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
    },
    updatedAt: {
        type: String,
        default: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
    }
})



module.exports = mongoose.model('Comments', Comments);