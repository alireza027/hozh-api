const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;
const Posts = new Schema({
    _id: {
        type: mongoose.Types.ObjectId,
    },
    title: {
        type: String,
        minLength: [3, "Your title must be more than 3 characters long"],
        maxlength: [60, "Your title must be less than 60 characters long"],
        required: [true, "Title require"],
    },
    subTitle: {
        type: String,
        minlength: [3, "Your sub title must be more than 3 characters long"],
        maxlength: [60, "Your sub title must be less than 60 characters long"],
    },
    postPicture: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        minlength: [10, "Your website description must be more than 10 characters long"],
        maxlength: [200, "Your website description must be less than 200 characters long"],
        required: [true, "Description require"]
    },
    price: {
        type: Number,
        required: [true, "Price require"]
    },
    discount: {
        type: Object,
        default: { disCount: 0, unit: "%" }
    },
    discountTime: {
        type: Object,
        default: { time: "24", unit: "hour" }
    },
    count: {
        type: Number,
        default: 0,
    },
    oldPrice: {
        type: Array,
        default: []
    },
    // moshakhasat
    specifications: {
        type: Array,
        default: []
    },
    queries: {
        type: Array,
        default: [],
    },
    rating: {
        type: Array,
        default: []
    },
    countOfBuy: {
        type: Number,
        default: 0
    },
    shortLink: {
        type: String,
    },
    colors: {
        type: Array,
        default: []
    },
    sizes: {
        type: Array,
        default: [],
    },
    categories: {
        type: Array,
        default: []
    },
    tags: {
        type: Array,
        default: []
    },
    // barresi
    review: {
        type: Array,
        default: []
    },
    pictures: {
        type: Array,
        default: [],
    },
    files: {
        type: Array,
        default: []
    },
    brand: {
        type: String,
        minlength: [3, "Your brand must be more than 3 chracters long"],
        maxlength: [40, "Your brand must be less than 40 chracters long"],
    },
    countOfOffer: {
        type: Number,
        default: 0
    },
    // garanti
    guarantee: {
        type: String,
        default: "Not guarantee"
    },
    extraTips: {
        type: String,
        default: ""
    },
    views: {
        type: Array,
        default: []
    },
    commentActive: {
        type: Boolean,
        default: true,
    },
    // nokat
    types: {
        type: String,
        default: ""
    },
    comments: [{ type: mongoose.Types.ObjectId, ref: "Comments" }],
    likes: { type: mongoose.Types.ObjectId, ref: "Likes" },
    disLikes: { type: mongoose.Types.ObjectId, ref: "DisLikes" },
    raletedPost: [{ type: mongoose.Types.ObjectId, ref: "Posts" }],
    author : { type: mongoose.Types.ObjectId, ref: "Users" },
    status : {
        type : Number,
        default : "1"
    },
    publishTime : {
        type : String,
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



module.exports = mongoose.model('Posts', Posts);