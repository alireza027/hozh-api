// add dependencies
const router = require('express').Router();


// add controller
const RecentSeesController = require('../controllers/RecentSeesController');


// recent-sees get one GET method
router.get('/fetch-one', RecentSeesController.FetchRecentSees);


// recent-sees get All GET method
router.get('/fetch-all-recent-sees', RecentSeesController.FetchAllRecentSees);


// recent-sees paginate GET method
router.get('/fetch-paginate-recent-sees', RecentSeesController.FetchAllAndPaginateRecentSees);


// update add recent-sees PUT method
router.put('/update-recent-sees-add', RecentSeesController.AddRecentSees);


// update delete recent-sees PUT method
router.put('/update-recent-sees-delete', RecentSeesController.DeleteRecentSees);


// reset one recent-sess PUT method
router.put('/reset-recent-sess', RecentSeesController.ResetRecentSees);


// reset all recent-sess PUT method
router.put('/reset-recent-sess-all', RecentSeesController.ResetRecentSeeses);

// export this module as router
module.exports = router;