const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;
const Users = new Schema({
    _id: {
        type: mongoose.Types.ObjectId,
    },
    name: {
        type: String,
        trim: true,
        minlength: [3, "Your name must be more than 3 characters long"],
        maxlength: [15, "Your name must be less than 15 characters long"],
    },
    family: {
        type: String,
        trim: true,
        minlength: [3, "Your family must be more than 3 characters long"],
        maxlength: [15, "Your family must be less than 15 characters long"],
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
    birthdayDate: {
        type: String,
        minlength: [8, "Your birthday date must be 8 more than characters long"],
        maxlength: [10, "Your birthday date must be 10 less than characters long"],
    },
    nationalCode: {
        type: String,
        trim: true,
        minlength: [15, "National code less than 15 characters"],
    },
    address: {
        type: String,
        minlength: [20, "Your address must be more than 20 characters long"],
        maxlength: [150, "You address must be less than 150 characters long"],
    },
    gender: {
        type: String,
        minlength: [3, "Your gender must be more than 3 characters long"],
        maxlength: [6, "Your gender must be less than 6 characters long"],
    },
    profilePic: {
        type: String,
        default: "",
    },
    lore: {
        type: Number,
        default: 5
    },
    likes: [{ type: Schema.Types.ObjectId, ref: "Likes" }],
    disLikes: [{ type: Schema.Types.ObjectId, ref: "Dis_Likes" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comments" }],
    bookmarks: [{ type: Schema.Types.ObjectId, ref: "Bookmarks" }],
    orders: [{ type: Schema.Types.ObjectId, ref: "Orders" }],
    recentSees: [{ type: Schema.Types.ObjectId, ref: "Recent_Sees" }],
    chats: [{ type: Schema.Types.ObjectId, ref: "Chats" }],
    createdAt: {
        type: String,
        default: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
    },
    updatedAt: {
        type: String,
        default: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
    }
})

module.exports = mongoose.model('Users', Users);