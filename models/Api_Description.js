const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;
const Api_Description = new Schema({
    name: {
        type: String,
        trim: true,
        minlength: [3, "Your name must be more than 3 characters long"],
        maxlength: [15, "Your name must be less than 15 characters long"],
        required : [true,"Your name is required"]
    },
    family: {
        type: String,
        trim: true,
        minlength: [3, "Your family must be more than 3 characters long"],
        maxlength: [15, "Your family must be less than 15 characters long"],
        required : [true,"Your family is required"]
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Email require filed"],
        minlength: [5, "Your email must be more than 5 characters long "],
        unique: [true, "Your email must be unique"],
        validate: {
            validator: function (email) {
                return (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
            },
            message: props => `${props.value} is not a valid email format `
        }
    },
    phoneNumber: {
        type: String,
        trim: true,
        required: [true, "Phone require field"],
        unique: [true, "Your phone number must be unique"],
        validate: {
            validator: function (phoneNumber) {
                return (/(0)([0-9]{10})$/.test(phoneNumber.toString()))
            },
            message: props => `${props.value} is not a valid phone number format`
        }
    },
    password: {
        type: String,
        trim: true,
        required: [true, "Password require filed"],
    },
    gender: {
        type: String,
        minlength: [3, "Your gender must be more than 3 characters long"],
        maxlength: [6, "Your gender must be less than 6 characters long"],
    },
    apiName: {
        type: String,
        minlength: [3, "Your api name must be more than 3 characters long"],
        maxlength: [50, "Your api name must be less than 50 characters long"],
        required: [true, " API Name require"]
    },
    description: {
        type: String,
        minlength: [10, "Your api description must be more than 10 characters long"],
        maxlength: [200, "Your api description must be less than 200 characters long"],
    },
    logo: {
        type: String,
        required: [true, "logo field is required"]
    },
    category: {
        type: String,
        maxlength: [30, "Your api category must be more than 30 characters long "],
        default: "not-different",
    },
    language: {
        type: String,
        default: "english",
    },
    ownerName: {
        type: String,
        trim: true,
        minlength: [3, "Your owner name must be more than 3 characters long"],
        maxlength: [15, "Your owner name must be less than 15 characters long"],
    },
    ownerFamily: {
        type: String,
        trim: true,
        minlength: [3, "Your owner family must be more than 3 characters long"],
        maxlength: [15, "Your owner family must be less than 15 characters long"],
    },
    mongoUrl: {
        type: String,
        default: "mongodb://localhost:27017/"
    },
    dbName: {
        type: String,
        default: "hozh_api"
    },
    payApi: {
        type: String,
        default: ""
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



module.exports = mongoose.model('Api_Description', Api_Description);