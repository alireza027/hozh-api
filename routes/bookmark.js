// add dependencies
const router = require('express').Router();


// add controllers
const BookmarkController = require('../controllers/BookmarkController');


// add middlewars
const authenticateToken = require('../middlewares/authenticateToken');


// bookmark get one bookmark user GET method
router.get('/fetch-one-bookmark-user/:id', authenticateToken, BookmarkController.FetchOneBookmarkUser);


// bookmark get all bookmarks user GET method
router.get('/fetch-all-bookmarks-user', authenticateToken, BookmarkController.FetchAllBookmarksUser);


// bookmark paginate GET method
router.get('/fetch-all-bookmarks-users', authenticateToken, BookmarkController.FetchAllBookmarksUsers);


// update bookmark for add  PUT method
router.post('/add-bookmark/:postId', authenticateToken, BookmarkController.AddBookmark);


// update bookmark for delete PUT method
router.delete('/delete-bookmark/:id', authenticateToken, BookmarkController.DeleteBookmark);


// reset bookmarks PUT method
router.delete('/reset-bookmarks', authenticateToken, BookmarkController.ResetBookmarks);


// export this module as router
module.exports = router;