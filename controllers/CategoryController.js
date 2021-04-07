// add dependencies
const moment = require('moment');
const mongoose = require('mongoose');


// add models
const Categories = require("../models/Categories");


// fetch one category
exports.FetchCategory = (req, res) => {
    if (req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null) {
        res.status(403).send({
            code: 403,
            message: "Forbidden"
        })
    } else {
        if (req.user.lore == 1 || req.user.lore == 2) {
            Categories.findOne({ _id: req.params.id }).then(fetchOneByIdCategoryResult => {
                res.status(200).send({
                    code: 200,
                    message: "fetch one category by params",
                    category: fetchOneByIdCategoryResult
                })
            }).catch(error => {
                res.status(400).send({
                    name: error.name,
                    message: error.message
                });
            })
        } else {
            res.status(403).send({
                code: 403,
                message: "Forbidden"
            })
        }
    }
};


// fetch all categories
exports.FetchAllCategories = (req, res) => {
    if (req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null) {
        res.status(403).send({
            code: 403,
            message: "Forbidden"
        })
    } else {
        if (req.user.lore == 1 || req.user.lore == 2) {
            Categories.find({}).sort({ _id: -1 }).then(fetchAllCategoryResult => {
                res.status(200).send({
                    code: 200,
                    message: "fetch all category",
                    categories: fetchAllCategoryResult
                })
            }).catch(error => {
                res.status(400).send({
                    name: error.name,
                    message: error.message
                });
            })
        } else {
            res.status(403).send({
                code: 403,
                message: "Forbidden"
            })
        }
    }
};


// add new category
exports.AddCategory = (req, res) => {
    if (req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null) {
        res.status(403).send({
            code: 403,
            message: "Forbidden"
        })
    } else {
        if (req.user.lore == 1 || req.user.lore == 2) {
            new Categories({
                name: req.body.name
            }).save().then(addCategoryResult => {
                res.status(201).send({
                    code: 201,
                    message: "create new category"
                })
            }).catch(error => {
                res.status(400).send({
                    name: error.name,
                    message: error.message
                });
            })
        } else {
            res.status(403).send({
                code: 403,
                message: "Forbidden"
            })
        }
    }
};


// update category
exports.UpdateCategory = (req, res) => {
    if (req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null) {
        res.status(403).send({
            code: 403,
            message: "Forbidden"
        })
    } else {
        if (req.user.lore == 1 || req.user.lore == 2) {
            Categories.updateOne({ _id: req.params.id }, {
                name: req.body.name,
                updatedAt: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
            }).then(updateCategoryByIdResult => {
                res.status(200).send({
                    code: 200,
                    message: "your category is updated"
                })
            }).catch(error => {
                res.status(400).send({
                    name: error.name,
                    message: error.message
                });
            })
        } else {
            res.status(403).send({
                code: 403,
                message: "Forbidden"
            })
        }
    }
};


// delete category 
exports.DeleteCategory = (req, res) => {
    if (req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null) {
        res.status(403).send({
            code: 403,
            message: "Forbidden"
        })
    } else {
        if (req.user.lore == 1 || req.user.lore == 2) {
            Categories.deleteOne({ _id: req.params.id }).then(deleteCategoryResult => {
                res.status(200).send({
                    code: 200,
                    message: "your category is deleted"
                })
            }).catch(error => {
                res.status(400).send({
                    name: error.name,
                    message: error.message
                });
            })
        } else {
            res.status(403).send({
                code: 403,
                message: "Forbidden"
            })
        }
    }
};


// delete all categories
exports.DeleteCategories = (req, res) => {
    if (req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null) {
        res.status(403).send({
            code: 403,
            message: "Forbidden"
        })
    } else {
        if (req.user.lore == 1 || req.user.lore == 2) {
            Categories.deleteMany({}).then(deleteAllCategoriesResult => {
                res.status(200).send({
                    code: 200,
                    message: "delete all categories"
                })
            }).catch(error => {
                res.status(400).send({
                    name: error.name,
                    message: error.message
                });
            })
        } else {
            res.status(403).send({
                code: 403,
                message: "Forbidden"
            })
        }
    }
}