const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;
const Orders = new Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "Users" },
    postId: [{ type: mongoose.Types.ObjectId, ref: "Posts" }],
    orders: {
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



module.exports = mongoose.model('Orders', Orders);