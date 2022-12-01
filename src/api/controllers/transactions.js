// controllers/transactions.js
const Transactions = require('../models/transactions');
const mongoose = require('mongoose');
const { v4 } = require('uuid');
const { creditAccount, debitAccount } = require( '../utils/transaction');


const transfer  = () => {
    return new Promise(async(resolve,reject)=>{
       
        const session = await mongoose.startSession();
        session.startTransaction()
        try {
           
            let toNumber = "+254790175477"
            let fromNumber = "+254790175477"
            let amount = 10
            let summary = "tester"
            const reference = v4();
            if (!toNumber && !fromNumber && !amount && !summary) {
                resolve({
                    status: false,
                    message: 'Please provide the following details: toNumber fromNumber, amount, summary'
                })
            }

            const transferResult = await Promise.all([
                debitAccount(
                {amount, number:toNumber, purpose:"transfer", reference, summary,
                trnxSummary: `TRFR TO: ${toNumber}. TRNX REF:${reference} `, session}),
                creditAccount(
                {amount, number:toNumber, purpose:"transfer", reference, summary,
                trnxSummary:`TRFR FROM: ${fromNumber}. TRNX REF:${reference} `, session})
            ]);

            const failedTxns = transferResult.filter((result) => result.status !== true);
            if (failedTxns.length) {
                const errors = failedTxns.map(a => a.message);
                await session.abortTransaction();
                resolve({
                    status: false,
                    message: errors
                })
            }

            await session.commitTransaction();
            session.endSession();

            resolve({
                status: true,
                message: 'Transfer successful'
            })
        } catch (err) {
            await session.abortTransaction();
            session.endSession();

            reject({
                status: false,
                message: `Unable to find perform transfer. Please try again. \n Error: ${err}`
            })
        }
    })
}

module.exports = { transfer };
