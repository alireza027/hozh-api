const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;
const Chats = new Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "Users" },
    messages: {
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



module.exports = mongoose.model('Chats', Chats);