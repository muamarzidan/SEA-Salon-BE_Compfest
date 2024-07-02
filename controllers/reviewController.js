// controllers/reviewController.js
const Review = require('../models/Review');
const Service = require('../models/Service');
const User = require('../models/User');
const { validationResult } = require('express-validator');

exports.createReview = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { serviceId, rating, comment } = req.body;
    const userId = req.user.userId;

    try {
        const review = await Review.create({ userId, serviceId, rating, comment });
        res.status(201).send(review);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.findAll({
            include: [
                { model: Service },
                { model: User }
            ]
        });
        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};