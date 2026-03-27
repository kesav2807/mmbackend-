const Razorpay = require('razorpay');
const crypto = require('crypto');
const Payment = require('../models/Payment');
const Booking = require('../models/Booking');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @desc Create Order
const createOrder = async (req, res) => {
  const { amount, bookingId } = req.body;
  const options = {
    amount: amount * 100, // Amount in paise
    currency: 'INR',
    receipt: `receipt_${Date.now()}_${bookingId}`,
  };
  try {
    const order = await razorpay.orders.create(options);
    if (!order) return res.status(500).json({ message: 'Order creation failed' });
    const payment = await Payment.create({ orderId: order.id, amount, booking: bookingId, status: 'Pending' });
    res.status(200).json({ order, payment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Verify Payment and Update Booking
const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const body = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(body.toString()).digest('hex');
  const isVerified = expectedSignature === razorpay_signature;
  if (isVerified) {
    const payment = await Payment.findOneAndUpdate({ orderId: razorpay_order_id }, { paymentId: razorpay_payment_id, status: 'Success' }, { new: true });
    if (payment) {
      await Booking.findByIdAndUpdate(payment.booking, { paymentStatus: 'Success', bookingStatus: 'Confirmed', razorpayOrderId: razorpay_order_id, razorpayPaymentId: razorpay_payment_id });
    }
    res.status(200).json({ message: 'Payment verified successfully' });
  } else {
    res.status(400).json({ message: 'Payment verification failed' });
  }
};

const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find({}).populate('booking').sort({ createdAt: -1 });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder, verifyPayment, getPayments };
