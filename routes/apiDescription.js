// add dependencies
const router = require('express').Router();
const multer = require('multer');


// add controllers
const ApiDescriptionController = require('../controllers/ApiDescriptionController');


// add middlewares
const authenticateToken = require('../middlewares/authenticateToken');


// multer config
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/apiDescription');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
})
var upload = multer({
    storage: storage,
    limits: {
        files: 1,
        fileSize: 1000000 * 1 // 1MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg|svg)$/)) {
            return cb(new Error('Please upload an image (png,jpg,jpeg,svg).'))
        }
        cb(undefined, true)
    }
});


// fetch api description
router.get('/fetch-api-description',authenticateToken, ApiDescriptionController.FetchApiDescription);


// begin and create api description POST method
router.post('/create-api-description', upload.single('pic'), ApiDescriptionController.CreateApiDescription, (error, req, res, next) => {
    res.status(400).send({ error: error, code: 400, errorMessage: "multer error" });
});


// update api description PUT method
router.put('/update-api-description', authenticateToken, upload.single('pic'), ApiDescriptionController.UpdateApiDescription, (error, req, res, next) => {
    res.status(400).send({ error: error, code: 400, errorMessage: "multer error" });
});


// delete api description DELETE method 
router.delete('/delete-api-description', authenticateToken, ApiDescriptionController.deleteApiDescription);


// export this module as router
module.exports = router;