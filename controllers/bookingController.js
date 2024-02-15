// controllers/bookingController.js
const Booking = require('../models/bookingModel');

exports.getBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll();
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createBooking = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const booking = await Booking.create({ name, email, phone });
        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone } = req.body;
        await Booking.update({ name, email, phone }, { where: { id } });
        res.json({ message: 'Booking updated successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;
        await Booking.destroy({ where: { id } });
        res.json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
