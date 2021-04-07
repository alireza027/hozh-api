// add dependencies
const mongoose = require('mongoose');
const moment = require('moment');


// add models
const Orders = require('../models/Orders');


// fetch order
exports.FetchOrder = (req, res) => {
    Orders.findOne({ _id: req.params.id }).populate('postId', "_id postPicture title description ").then(fetchOneOrdersByIdResult => {
        var concat = [];
        fetchOneOrdersByIdResult.postId.forEach((postId, length) => {
            concat.push({ post: postId, order: fetchOneOrdersByIdResult.orders[length] })
        })
        res.status(200).send({
            code: 200,
            message: "fetch one receord of orders DB",
            orders: concat,
            createdAt: fetchOneOrdersByIdResult.createdAt,
            updatedAt: fetchOneOrdersByIdResult.updatedAt,
        });
    }).catch(error => {
        res.status(400).send({
            name: error.name,
            message: error.message
        })
    })
};


// fetch all orders
exports.FetchAllOrders = (req, res) => {
    Orders.find({}).select('postId orders').populate('postId', "_id postPicture title description ").populate('userId', "_id email").then(fetchAllOrdersResult => {
        var concat = [];
        fetchAllOrdersResult.forEach((allOrder, length1) => {
            allOrder.postId.forEach((postId, length) => {
                concat.push({ post: postId, order: fetchAllOrdersResult[length1].orders[length], userId: fetchAllOrdersResult[length1].userId })
            })
        })
        res.status(200).send(concat);
    }).catch(error => {
        res.status(400).send({
            name: error.name,
            message: error.message
        })
    })
};


// fetch all and paginate orders
exports.FetchAllAndPaginateOrders = (req, res) => {
    res.status(200).send('fetch-paginate-order - GET');
};


// add orders
exports.AddOrders = (req, res) => {
    var postId = [];
    var orders = [];
    req.body.orders.forEach(order => {
        order._id = mongoose.Types.ObjectId();
        order.createdTime = moment(new Date()).format("HH:mm:ss");
        order.createdDate = moment(new Date()).format("YYYY-MM-DD");
        postId.push(order.postId);
        orders.push(order)
    });
    Orders.updateOne({ userId: req.body.userId }, {
        $push: { postId: postId, orders: orders },
        updatedAt: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
    }).then(addNewOrderResult => {
        res.status(201).send({
            code: 201,
            message: "add new orders"
        })
    }).catch(error => {
        res.status(400).send({
            name: error.name,
            message: error.message
        })
    })
};


// delete order
exports.DeleteOrder = (req, res) => {
    Orders.updateOne({ userId: mongoose.Types.ObjectId(req.body.userId) }, {
        $pull: { postId: mongoose.Types.ObjectId(req.body.postId), orders: { postId: req.body.postId } }
    }).then(deleteOrderResult => {
        res.status(200).send({
            code: 200,
            message: `delete selected order`
        })
    }).catch(error => {
        res.status(400).send({
            name: error.name,
            message: error.message
        })
    })
};