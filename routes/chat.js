// add dependencies
const router = require('express').Router();


// add models
const Users = require('../models/Users');


// chat get one GET method
router.get('/fetch/:id', (req, res) => {
    res.send(':/id - GET');
})


// chat get one GET method
router.get('/fetch-all-chat', (req, res) => {
    res.send('fetch-all-chat - GET');
})


// chat paginate GET method
router.get('/fetch-paginate-chat', (req, res) => {
    res.send('fetch-paginate-chat - GET');
})


// create chat POST method
router.post('/create-chat', (req, res) => {
    res.send('create-chat - POST');
})


// update chat PUT method
router.put('/update-chat/:id', (req, res) => {
    res.send('update-chat - PUT');
})


// delete chat DELETE method
router.post('/delete-chat/:id', (req, res) => {
    res.send('delete-chat - DELETE');
})


// export this module as router
module.exports = router;