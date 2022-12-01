// controllers/wallets.js
const Wallets = require('../models/wallets');

const createWallet = async ({phoneNumber}) => {
    return new Promise(async(resolve,reject)=>{
        try{
            // const {number}= req.body;
            const number = phoneNumber;

            const walletExists = await Wallets.findOne({number});
            if (!walletExists){
                const result = await Wallets.create({number});
                console.log(result)
                resolve({
                    status: true,
                    message: 'Wallets created successfully',
                    data: result
                })
            }
            if(walletExists){
                resolve("continue")
            }
                
            

        } catch (err) {
            resolve({
                status: true,
                message: `Unable to create wallet. Please try again. \n Error: ${err}`
            })
        }
    })
}

module.exports = { createWallet };
