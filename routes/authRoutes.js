const express = require('express');
const router = express.Router();
const { adminLogin } = require('../controllers/authController');
const { getStats } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', adminLogin);
router.get('/stats', protect, getStats);

module.exports = router;
