// add dependencies
const router = require('express').Router();


// add controllers
const ViewController = require('../controllers/ViewController');


// fetch views GET method
router.get('/fetch-view', ViewController.FetchView);


// add new view POST method
router.put('/add-view', ViewController.AddView);


// reset views 
router.put('/reset-views', ViewController.ResetViews);

// export this module as router
module.exports = router;