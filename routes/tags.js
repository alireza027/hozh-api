// add dependencies
const router = require('express').Router();


// add controllers
const TagController = require('../controllers/TagController');


// fetch one tags
router.get('/:id', TagController.FetchTag);


// fetch all tags
router.get('/fetch-all-tags', TagController.FetchAllTags);


// add new tags
router.post('/add-tag', TagController.AddTag);


// update tags
router.put('/update-tag/:id', TagController.UpdateTag);


// delete tags 
router.delete('/delete-tag/:id', TagController.DeleteTag);


// delete all tags
router.delete('/delete-tags', TagController.DeleteTags);


// export this module as router
module.exports = router;