const mongoose = require('mongoose');

const voucherSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Nama game harus diisi'],
  },
  status: {
    type: String,
    enum: ['Y', 'N'],
    default: 'Y',
  },
  thumbnial: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  nominal: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Nominal',
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  price: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Voucher', voucherSchema);
