// add dependencies
const router = require('express').Router();


// add controllers
const PostController = require('../controllers/PostController');


// add middlewars
const authenticateToken = require('../middlewares/authenticateToken');


// post get one GET method
router.get('/:id',PostController.FetchPost);


// post get All GET method
router.get("/fetch-all-post", PostController.FetchAllPosts);


// post paginate GET method
router.get('/fetch-paginate', PostController.FetchAllAndPaginatePosts);


// create new post POST method
router.post('/create-post',authenticateToken, PostController.AddPost);


// update post PUT method
router.put('/update-post/:id',authenticateToken, PostController.UpdatePost);


// remove post DELETE method
router.delete('/delete-post/:id',authenticateToken, PostController.DeletePost);


// export this module as router
module.exports = router;