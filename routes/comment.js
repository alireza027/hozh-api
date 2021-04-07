// add dependencies
const router = require('express').Router();


// add controller
const CommentController = require('../controllers/CommentController');


// add middlewars
const authenticateToken = require('../middlewares/authenticateToken');


// comment get one comment user GET method
router.get('/fetch-one-comment-user/:id', authenticateToken, CommentController.FetchOneCommentUser);


// comment get all users GET method
router.get('/fetch-all-comments-user/:userId', authenticateToken, CommentController.FetchAllCommentsUser);


// comment get all users GET method
router.get('/fetch-all-comments-users', authenticateToken, CommentController.FetchAllCommentsUsers);


// add comment POST method =======> halle
router.post('/add-comment/:postId', authenticateToken, CommentController.AddComment);


// add like PUT method ======> halle
router.put('/add-like/:id', authenticateToken, CommentController.AddLike);


// add dis like PUT method =====> halle
router.put('/add-dis-like/:id', authenticateToken, CommentController.AddDisLike);


// add rating PUT method  =====> halle
router.put('/add-rating/:id', authenticateToken, CommentController.AddRating);


// add report PUT method =====> halle
router.put('/add-report/:id', authenticateToken, CommentController.AddReport);


// update comment PUT method =====> halle
router.put('/update-comment/:id', authenticateToken, CommentController.UpdateComment);



// update comment when change status PUT method =====> halle
router.put('/update-comment-change-status/:id', authenticateToken, CommentController.UpdateComment);


// update report PUT method =====> halle
router.put('/update-report/:id', authenticateToken, CommentController.UpdateReport);


// delete like PUT method =====> halle
router.put('/delete-like/:id', authenticateToken, CommentController.DeleteLike);


// delete dis like PUT method =====> halle
router.put('/delete-dis-like/:id', authenticateToken, CommentController.DeleteDisLike);


// delete rating PUT method =====> halle
router.put('/delete-rating/:id', authenticateToken, CommentController.DeleteRating);


// delete report PUT method  =====> halle
router.put('/delete-report/:id/:userId', authenticateToken, CommentController.DeleteReport)


// delete comment DELETE method =====> halle
router.delete('/delete-comment/:id', authenticateToken, CommentController.DeleteComment);


// reset all comments PUT method
router.delete('/reset-comments', authenticateToken, CommentController.ResetComments);


// export this module as router
module.exports = router;