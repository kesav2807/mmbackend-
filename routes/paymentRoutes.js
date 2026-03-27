const express = require('express');
const router = express.Router();
const { createOrder, verifyPayment, getPayments } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getPayments);
router.post('/create-order', createOrder);
router.post('/verify', verifyPayment);

module.exports = router;
