// routes/review.js
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { createReview, getAllReviews } = require('../controllers/reviewController');
const { authenticate } = require('../middlewares/auth');
const { checkRole } = require('../middlewares/roleCheck');

router.post('/',
    authenticate,
    checkRole('Customer'),
    [
        body('serviceId').isInt(),
        body('rating').isInt({ min: 1, max: 5 }),
        body('comment').isString().isLength({ max: 500 })
    ], createReview
);

router.get('/', getAllReviews);

module.exports = router;