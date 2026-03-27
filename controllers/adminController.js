const Trip = require('../models/Trip');
const Booking = require('../models/Booking');
const Payment = require('../models/Payment');

// @desc Get dashboard stats
const getStats = async (req, res) => {
  try {
    const totalTrips = await Trip.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const payments = await Payment.find({ status: 'Success' });
    const totalRevenue = payments.reduce((acc, curr) => acc + curr.amount, 0);
    const recentBookings = await Booking.find({}).populate('trip').sort({ createdAt: -1 }).limit(5);
    res.status(200).json({ totalTrips, totalBookings, totalRevenue, recentBookings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getStats };
