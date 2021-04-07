// add dependencies
const router = require('express').Router();


// add controllers
const CategoryController = require('../controllers/CategoryController');


// add middlewares
const authenticateToken = require('../middlewares/authenticateToken');


// fetch one category
router.get('/:id', authenticateToken, CategoryController.FetchCategory);


// fetch all categories
router.post('/fetch-all-categories', authenticateToken, CategoryController.FetchAllCategories);


// add new category
router.post('/add-category', authenticateToken, CategoryController.AddCategory);


// update category
router.put('/update-category/:id', authenticateToken, CategoryController.UpdateCategory);


// delete category 
router.delete('/delete-category/:id', authenticateToken, CategoryController.DeleteCategory);


// delete all categories
router.delete('/delete-categories', authenticateToken, CategoryController.DeleteCategories);


// export this module as router
module.exports = router;