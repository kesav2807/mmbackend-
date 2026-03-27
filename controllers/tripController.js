const Trip = require('../models/Trip');

// @desc Get all trips
const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find({}).sort({ createdAt: -1 });
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get single trip
const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Create a trip
const createTrip = async (req, res) => {
  try {
    const { title, description, location, duration, price, availableSeats, startDate, endDate } = req.body;
    const imageUrl = req.file ? req.file.path : '';
    const trip = await Trip.create({ title, description, location, duration, price, availableSeats, startDate, endDate, imageUrl });
    res.status(201).json(trip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc Update trip
const updateTrip = async (req, res) => {
  try {
    const { title, description, location, duration, price, availableSeats, startDate, endDate } = req.body;
    const imageUrl = req.file ? req.file.path : req.body.imageUrl;
    const trip = await Trip.findByIdAndUpdate(req.params.id, { title, description, location, duration, price, availableSeats, startDate, endDate, imageUrl }, { new: true });
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.status(200).json(trip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc Delete trip
const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.id);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.status(200).json({ message: 'Trip deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTrips, getTripById, createTrip, updateTrip, deleteTrip };
