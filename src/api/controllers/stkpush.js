// const express             = require("express");
// // const get_access_token    = require("../utils/accesstoken");
// const request             = require("request");
// const router              = express.Router();




// router.get("/get_access_token", get_access_token, (req, res) => {
//     res.status(200).json({ access_token: req.access_token });
// });


// router.post("/send_stk_push", get_access_token, (req, res) => {
//   let endpoint_url = "https://api.connect.stanbicbank.co.ke/api/sandbox/mpesa-checkout";
//   let auth = req.access_token;
 

//   request(
//     {
//       uri: endpoint_url,
//       method: "POST",
//       headers: {
//         Authorization: auth,
//       },
//       json: {
//         dbsReferenceId: "REW21331DR5F1",
//         billAccountRef: "3333562174",
//         amount: req.body.amount,
//         mobileNumber: req.body.number,
//         corporateNumber: "740757",
//         bankReferenceId: "REW21331DR5F1",
//         txnNarrative: "ttsteeeee",
//         CallBackURL: "https://dc97-41-90-59-150.ngrok.io/api/payments/mpesa_stk_webhook",
//       },
//     }),

//     async(err, resp, body) => {
//         if (err) {
//             console.log(err);
//         }
        
//         const walletExists = await Wallets.findOne(req.body.number);
//         let balance =Number(walletExists.balance) + Number(req.body.amount)
//         const updateWallet = await Wallets.findOneAndUpdate(
//             {number: req.body.number}, 
//             {
//                 $set: {
//                     balance : balance
//                 },
//             })
//             res.status(200).json(body);
//         } 
        
      
    
// });



// module.exports = router;
