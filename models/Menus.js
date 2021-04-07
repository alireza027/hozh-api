const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;
const Menus = new Schema({
    text: {
        type: String,
        required: [true, "name filed is required"],
        minlength: [3, "Name filed must be more than 3 characters long"],
        maxlength: [50, "Name filed must be less than 50 characters long"],
    },
    link: {
        type: String,
        required: [true, "link field is required"]
    },
    icon: {
        type: String,
        default: ""
    },
    parent : {type: mongoose.Types.ObjectId , ref : "Menus"},
    children : [{type: mongoose.Types.ObjectId , ref : "Menus"}],
    // menu-subMenu
    type : {
        type : String,
        required : [true,"type field is required"],
        minlength : [3,"Type field must be more than 3 characters long"],
        maxlength : [30,"Type field must be less than 30 characters long"]
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



module.exports = mongoose.model('Menus', Menus);