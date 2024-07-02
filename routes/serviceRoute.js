const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { createServices, getAllServices } = require('../controllers/serviceController');
const { authenticate } = require('../middlewares/auth');
const { checkRole } = require('../middlewares/roleCheck');
const upload = require('../middlewares/upload');

router.post('/',
    authenticate, 
    checkRole('Admin'),
    upload.single('thumbnail'), [
        body('name').isString().isLength({ max: 20 }),
        body('type').isString().isLength({ max: 20 }),
        body('description').isString(),
        body('price').isInt({ max: 1000000000 })
    ], createServices
);
router.get('/', getAllServices);

module.exports = router;


// const express = require('express');
// const router = express.Router();
// const { body } = require('express-validator');
// const serviceController = require('../controllers/serviceController');
// const { authenticateAdmin } = require('../middlewares/auth');
// const upload = require('../middlewares/upload');

// router.post('/', authenticateAdmin, upload.single('thumbnail'), [
//     body('name').isString().isLength({ max: 20 }),
//     body('type').isString().isLength({ max: 20 }),
//     body('description').isString(),
//     body('price').isInt({ max: 1000000000 })
// ], serviceController.createService);

// module.exports = router;