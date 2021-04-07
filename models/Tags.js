const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;
const Tags = new Schema({
    name: {
        type: String,
        required: [true, "name filed is required"],
        min: [3, "Name filed must be more than 3 characters long"],
        max: [50, "Name filed must be less than 50 characters long"],
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



module.exports = mongoose.model('Tags', Tags);