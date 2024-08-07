const sequelize = require('../config/db');
const User = require('./User');
const Service = require('./Service');
const Review = require('./Review');
const Booking = require('./Booking');
require('./integration');

module.exports = {
    sequelize,
    User,
    Service,
    Review,
    Booking,
};