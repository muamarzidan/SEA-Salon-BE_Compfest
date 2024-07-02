const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoute');
const bookingRoutes = require('./routes/bookingRoute');
const reviewRoutes = require('./routes/reviewRoute');
const serviceRoutes = require('./routes/serviceRoute');
const app = express();
require('dotenv').config();

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/services', serviceRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});