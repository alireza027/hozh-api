const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;
const Dis_Likes = new Schema({
    postId: { type: mongoose.Types.ObjectId, ref: "Posts" },
    userId: [{ type: mongoose.Types.ObjectId, ref: "Users" }],
    disLikes: {
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



module.exports = mongoose.model('Dis_Likes', Dis_Likes);