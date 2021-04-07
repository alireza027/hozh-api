// add dependencies
const router = require('express').Router();
const multer = require('multer');

// add controllers
const MenuController = require('../controllers/MenuController');


// multer config
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/menus');
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


// fetch one menu GET method
router.get('/:id',MenuController.FetchMenu);


// fetch all menus GET method
router.get('/fetch-all-menu', MenuController.FetchAllMenus);


// fetch just menu and submenu GET Method
router.get('/fetch-just-menus',MenuController.FetchJustMenuParent);


// create new menu
router.post('/create-menu',upload.single('pic'), MenuController.AddMenu);


// update main menu
router.put('/update-menu/:id',upload.single('pic'), MenuController.updateMenu);


// delete main menu ans it's sub menus
router.delete('/delete-menu/:id', MenuController.DeleteMenu);


// reset menus and sub menus
router.delete('/delete-all-menus', MenuController.DeleteMenus);


// export this module as router
module.exports = router;