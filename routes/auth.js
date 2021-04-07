// add dependencies
const router = require('express').Router();
const multer = require('multer');



// add controllers
const AuthController = require("../controllers/AuthController");


// add middlewars
const authenticateToken = require('../middlewares/authenticateToken');


// multer config
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/users');
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


// login section POST method
router.post('/login', authenticateToken, AuthController.Login);


// register seciton POST method
router.post('/register', authenticateToken, upload.single('pic'), AuthController.Register, (error, req, res, next) => {
    res.status(400).send({ error: error, code: 400, errorMessage: "multer error" });
});


// Updateuser section PUT method
router.put("/update-user", authenticateToken, upload.single('pic'), AuthController.UpdateUser, (error, req, res, next) => {
    res.status(400).send({ error: error, code: 400, errorMessage: "multer error" });
});


// Delete user section PUT method -> must be write last section
router.put('/delete-user', authenticateToken, AuthController.DeleteUser);


// export this module as router
module.exports = router;