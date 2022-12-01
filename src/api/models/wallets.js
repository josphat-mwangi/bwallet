const mongoose =require('mongoose');

const walletSchema = new mongoose.Schema(
  {
    number: {
        type: String,
        required: true,
        trim: true,
        immutable: true,
        unique: true
    },
    balance: {
        type: mongoose.Decimal128,
        required: true,
        default: 0.00
    },

  },
  { timestamps: true }
);

const Wallets = mongoose.model('Wallets', walletSchema);
module.exports = Wallets;