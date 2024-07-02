const Booking = require('../models/Booking');
const Service = require('../models/Service');
const User = require('../models/User');
const { validationResult } = require('express-validator');

exports.createBooking = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { serviceId, date, time } = req.body;
    const userId = req.user.userId;
    const [hours, minutes] = time.split(':').map(Number);
    
    if (hours < 9 || hours > 21 || minutes !== 0) {
        return res.status(400).json({ error: 'Invalid time slot. We are open from 09:00 to 21:00.' });
    }

    try {
        const existingBooking = await Booking.findOne({
            where: {
                serviceId: serviceId,
                date: date,
                time: time
            }
        });

        if (existingBooking) {
            return res.status(400).json({ error: 'This time slot is already booked.' });
        }

        const booking = await Booking.create({ userId, serviceId, date, time });
        res.status(201).send(booking);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll({
            include: [
                {
                    model: Service,
                    attributes: ['id', 'name', 'type', 'price']
                },
                {
                    model: User,
                    attributes: ['id', 'username', 'email', 'phone']
                }
            ]
        });
        res.status(200).send(bookings);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};