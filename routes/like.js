// add dependencies
const router = require('express').Router();


// add controllers
const LikeController = require('../controllers/LikeController');


// add middlewars
const authenticateToken = require('../middlewares/authenticateToken');


// like get one GET method
router.get('/fetch-one-user-likes/:id',authenticateToken, LikeController.FetchLike);


// like get one GET method
router.get('/fetch-all-like',authenticateToken, LikeController.FetchAllLikes);


// like paginate GET method
router.get('/fetch-paginate-one-user-likes/:id',authenticateToken, LikeController.FetchAllAndPaginateLikes);


// update add like PUT method
router.put('/update-like-add/:postId',authenticateToken, LikeController.AddLike);


// update delete like PUT method
router.put('/update-like-delete/:postId',authenticateToken, LikeController.DeleteLike);


// reset one like PUT method
router.put('/reset-like/:postId',authenticateToken, LikeController.ResetLike);


// reset all likes PUT method
router.put('/reset-likes',authenticateToken, LikeController.ResetLikes);


// export this module as router
module.exports = router;