const express = require("express");
const app = express();
const cors = require("cors");
const doenv = require("dotenv");
const bodyparser = require("body-parser");
const db = require("./config/database");
const {XYZ_get_access_token, XYZ_stk, withdrawalToMpesa}    = require("./api/utils/accesstoken");
const { transfer } = require("./api/controllers/transactions");
const { createWallet } = require("./api/controllers/wallets")



doenv.config();

db.connect();
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());



app.post('/ussd', async(req, res) => {
    console.log(req.body);
    try{
        const { sessionId, serviceCode, phoneNumber, text, amount } = req.body;
        await createWallet({phoneNumber});
        let response = '';
        if (text == '') {
            response = `CON Welcome to BWallet
            1. Make payment
            2. Transfer funds
            3. Withdraw cash`;
        
        } else if ( text == '1') {
            response = `CON Enter amount to pay`;

        } else if ( text == '2') {
            response = `CON enter recipient's phone number`;
            
            
        }
        else if (text.startsWith('2*')){
            transfer()
        }

        else if ( text == '3') {
            response = `CON Enter amount to withdraw`;
            
        }else if (text.startsWith('3*')){
            console.log({stk:true})
            response = `END ${await withdrawalToMpesa({phoneNumber, amount:10})}`
        }  
        else if (text.startsWith('1*')){
            console.log({stk:true})
            response = `END ${await XYZ_stk({phoneNumber:phoneNumber.split('+')[1], amount:10})}`
        } 
        else{
            console.log({text, oops:true})
        }

        res.set('Content-Type: text/plain');
        res.send(response);
    }catch(err){
        console.log(err)
    }
    
    
});


app.listen(process.env.PORT || 4000, async () => {
  console.log(`Server Running ${process.env.PORT}`), await db.connect();
});
