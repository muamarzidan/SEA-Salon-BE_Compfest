const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Service = require('./Service');
const User = require('./User');

const Booking = sequelize.define('Booking', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    time: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
});

Booking.belongsTo(Service, { foreignKey: 'serviceId' });
Booking.belongsTo(User, { foreignKey: 'userId' });
Service.hasMany(Booking, { foreignKey: 'serviceId' });
User.hasMany(Booking, { foreignKey: 'userId' });

module.exports = Booking;