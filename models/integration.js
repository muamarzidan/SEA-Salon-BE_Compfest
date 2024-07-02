const User = require('./User');
const Service = require('./Service');
const Review = require('./Review');
const Booking = require('./Booking');

Service.hasMany(Review, { foreignKey: 'serviceId' });
User.hasMany(Review, { foreignKey: 'userId' });
User.hasMany(Booking, { foreignKey: 'userId' });
Booking.belongsTo(User, { foreignKey: 'userId' });
Booking.belongsTo(Service, { foreignKey: 'serviceId' });
Review.belongsTo(User, { foreignKey: 'userId' });
Review.belongsTo(Service, { foreignKey: 'serviceId' });

module.exports = { User, Service, Review, Booking };