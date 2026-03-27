const express = require('express');
const router = express.Router();
const { getTrips, getTripById, createTrip, updateTrip, deleteTrip } = require('../controllers/tripController');
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../config/cloudinary');

router.get('/', getTrips);
router.get('/:id', getTripById);
router.post('/', protect, upload.single('image'), createTrip);
router.put('/:id', protect, upload.single('image'), updateTrip);
router.delete('/:id', protect, deleteTrip);

module.exports = router;
