// utils/transactions.js
const Wallets = require('../models/wallets');
const Transactions = require('../models/transactions');

const creditAccount = async ({amount, number, purpose, reference, summary, trnxSummary, session}) => {
  const wallet = await Wallets.findOne({number});
  if (!wallet) {
    return {
      status: false,
      statusCode:404,
      message: `User ${number} doesn\'t exist`
    }
  };

  const updatedWallet = await Wallets.findOneAndUpdate({number}, { $inc: { balance: amount } }, {session});

  const transaction = await Transactions.create([{
    trnxType: 'CR',
    purpose,
    amount,
    number,
    reference,
    balanceBefore: Number(wallet.balance),
    balanceAfter: Number(wallet.balance) + Number(amount),
    summary,
    trnxSummary
  }], {session});

  console.log(`Credit successful`)
  return {
    status: true,
    statusCode:201,
    message: 'Credit successful',
    data: {updatedWallet, transaction}
  }
}

const debitAccount = async ({amount, number, purpose, reference, summary, trnxSummary, session}) => {
  const wallet = await Wallets.findOne({number});
  if (!wallet) {
    return {
      status: false,
      statusCode:404,
      message: `User ${number} doesn\'t exist`
    }
  };

  if (Number(wallet.balance) < amount) {
    return {
      status: false,
      statusCode:400,
      message: `User ${number} has insufficient balance`
    }
  }

  const updatedWallet = await Wallets.findOneAndUpdate({number}, { $inc: { balance: -amount } }, {session});
  const transaction = await Transactions.create([{
    trnxType: 'DR',
    purpose,
    amount,
    number,
    reference,
    balanceBefore: Number(wallet.balance),
    balanceAfter: Number(wallet.balance) - Number(amount),
    summary,
    trnxSummary
  }], {session});

  console.log(`Debit successful`);
  return {
    status: true,
    statusCode:201,
    message: 'Debit successful',
    data: {updatedWallet, transaction}
  }
}

module.exports = {
    creditAccount, debitAccount
};
