const Booking = require('../models/Booking');
const Trip = require('../models/Trip');

// @desc Create a booking
const createBooking = async (req, res) => {
  try {
    const { userName, email, tripId, numSeats, totalAmount } = req.body;
    const booking = await Booking.create({ userName, email, trip: tripId, numSeats, totalAmount });
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc Get all bookings
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({}).populate('trip').sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get single booking
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('trip');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update booking status
const updateBookingStatus = async (req, res) => {
  try {
    const { bookingStatus, paymentStatus } = req.body;
    const booking = await Booking.findByIdAndUpdate(req.params.id, { bookingStatus, paymentStatus }, { new: true });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc Delete booking
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createBooking, getBookings, getBookingById, updateBookingStatus, deleteBooking };
