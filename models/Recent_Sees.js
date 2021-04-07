const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;
const Recent_Sees = new Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "Users" },
    postId: [{ type: mongoose.Types.ObjectId, ref: "Posts" }],
    createdAt: {
        type: String,
        default: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
    },
    updatedAt: {
        type: String,
        default: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
    }
})



module.exports = mongoose.model('Recent_Sees', Recent_Sees);