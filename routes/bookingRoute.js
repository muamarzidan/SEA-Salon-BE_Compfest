const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { createBooking, getAllBookings } = require('../controllers/bookingController');
const { authenticate } = require('../middlewares/auth');
const { checkRole } = require('../middlewares/roleCheck');

router.post('/',
    authenticate,
    checkRole('Customer'),
    [
        body('serviceId').isInt(),
        body('date').isDate(),
        body('time').matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    ], createBooking
);

router.get('/', getAllBookings);

module.exports = router;