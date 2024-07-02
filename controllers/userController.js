const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).send(users);
    } catch (err) {
        res.status(500).send(err);
    }
}