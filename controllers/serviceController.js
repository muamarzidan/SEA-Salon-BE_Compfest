const Service = require('../models/Service');
const Review = require('../models/Review');
const User = require('../models/User');
const { validationResult } = require('express-validator');

exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.findAll({
            include: {
                model: Review,
                include: User
            }
        });

        const formattedServices = services.map(service => {
            return {
                id: service.id,
                nameService: service.name,
                typeService: service.type,
                thumbnail: service.thumbnail,
                description: service.description,
                price: service.price,
                rating: service.Reviews.length ? service.Reviews.reduce((acc, review) => acc + review.rating, 0) / service.Reviews.length : 0,
                reviewCount: service.Reviews.length,
                review: service.Reviews.map(review => {
                    return {
                        id: review.id,
                        username: review.User.username,
                        comment: review.comment,
                        rating: review.rating,
                        createdAt: review.createdAt
                    }
                }),
                createdAt: service.createdAt
            }
        });

        res.json(formattedServices);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createServices = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, type, description, price } = req.body;
    const thumbnail = req.file.path;

    try {
        const service = await Service.create({
            name,
            type,
            thumbnail,
            description,
            price
        });
        res.status(201).json(service);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};