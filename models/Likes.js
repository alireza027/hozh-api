const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;
const Likes = new Schema({
    postId: { type: mongoose.Types.ObjectId, ref: "Posts" },
    userId: [{ type: mongoose.Types.ObjectId, ref: "Users" }],
    likes: {
        type: Array,
        default: []
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



module.exports = mongoose.model('Likes', Likes);