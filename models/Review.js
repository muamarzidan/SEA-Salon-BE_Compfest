const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Service = require('./Service');
const User = require('./User');

const Review = sequelize.define('Review', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
});

Review.belongsTo(Service, { foreignKey: 'serviceId' });
Review.belongsTo(User, { foreignKey: 'userId' });
Service.hasMany(Review, { foreignKey: 'serviceId' });
User.hasMany(Review, { foreignKey: 'userId' });

module.exports = Review;