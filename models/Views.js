const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;
const Views = new Schema({
    views: {
        type: Array,
        default: [],
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



module.exports = mongoose.model('Views', Views);