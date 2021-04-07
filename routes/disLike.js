// add dependencies
const router = require('express').Router();
const moment = require('moment');
const mongoose = require('mongoose');


// add controllers
const DisLikeController = require('../controllers/DisLikeController');


// DisLikes get one GET method
router.get('/:id', DisLikeController.FetchDisLike);


// dis Like get one GET method
router.get('/fetch-all-dis-like',DisLikeController.FetchAllDisLikes);


// dis like paginate GET method
router.get('/fetch-paginate-dis-like', DisLikeController.FetchAllAndPaginateDisLikes);


// update add dis like PUT method
router.put('/update-dis-like-add', DisLikeController.AddDisLike);


// update delete dis like PUT method
router.put('/update-dis-like-delete', DisLikeController.DeleteDisLike);


// reset one dis like PUT method
router.put('/reset-dis-like', DisLikeController.ResetDisLike);


// reset all dis like PUT method
router.put('/reset-dis-likes', DisLikeController.ResetDisLikes);


// export this module as router
module.exports = router;