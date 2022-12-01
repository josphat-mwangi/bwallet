// const crypto = require('crypto');
// const uuid = crypto.randomUUID();
// console.log({uuid})

// const withdrawalToMpesa = ("/", (req, res)=>{

//     request(
//         {
//             uri: endpoint_url,
//             method: "POST",
//             headers: {
//                 Authorization: auth,
//             },
//             json:{
//                 "originatorAccount": {
//                     "identification": {
//                         "mobileNumber": req.body.number
//                     }
//                 },
//                 "requestedExecutionDate": new Date(),
//                 "dbsReferenceId": crypto.randomUUID(),
//                 "txnNarrative": "TRANSACTION NARRATIVE",
//                 "callBackUrl": "http://client_domain.com/omnichannel/esbCallback",
//                 "transferTransactionInformation": {
//                     "instructedAmount": {
//                         "amount": req.body.number,
//                         "currencyCode": "KES"
//                     },
//                     "mobileMoneyMno": {
//                         "name": "MPESA"
//                     },
//                     "counterparty": {
//                         "name": "J. Sparrow",
//                         "mobileNumber": req.body.number,
//                         "postalAddress": {
//                             "addressLine1": "Some street",
//                             "addressLine2": "99",
//                             "postCode": "1100 ZZ",
//                             "town": "Amsterdam",
//                             "country": "NL"
//                         }
//                     },
//                     "remittanceInformation": {
//                         "type": "UNSTRUCTURED",
//                         "content": "SALARY"
//                     },
//                     "endToEndIdentification": "5e1a3da132cc"
//                 }
//             }
//         }
//     )
//     async(err, resp, body) => {
//         if (err) {
//             console.log(err);
//         }
        
//         const walletExists = await Wallets.findOne(req.args.phoneNumber);
//         let balance = Number(walletExists.balance)  Number(req.body.amount)
//         const updateCartegory = await Wallets.findOneAndUpdate(
//             {number: req.body.number}, 
//             {
//                 $set: {
//                     balance : balance
//                 },
//             })
//         }

// })
