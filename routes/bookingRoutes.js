const express = require('express');
const router = express.Router();
const { createBooking, getBookings, getBookingById, updateBookingStatus, deleteBooking } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getBookings);
router.get('/:id', getBookingById);
router.post('/', createBooking);
router.put('/:id', protect, updateBookingStatus);
router.delete('/:id', protect, deleteBooking);

module.exports = router;
