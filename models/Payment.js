const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  paymentId: { type: String },
  amount: { type: Number, required: true },
  status: { type: String, required: true, default: 'Pending' },
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
