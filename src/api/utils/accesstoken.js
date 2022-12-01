const request = require("request");
const  Wallets  = require("../models/wallets");
const crypto = require('crypto');

const get_access_token = (req, res, next) => {
    let endpoint_auth_credentials = 'https://api.connect.stanbicbank.co.ke/api/sandbox/auth/oauth2/token';
  
    request.post({
        url: endpoint_auth_credentials,
        form: {
            client_id: 'ab820ecab4fba72aac48846c7b6277ba',
            client_secret: '38b3249107d20dbe05d029fd5b5fc464',
            scope: 'payments',
            grant_type: 'client_credentials'
        }
    }, (err, response, body) => {
        if (err) {
        console.log(err);
        } else {
            req.access_token = JSON.parse(body).access_token;
            next();
        }
    })
}
  


const XYZ_get_access_token = () => {
    return new Promise((resolve,reject)=>{

        let endpoint_auth_credentials = 'https://api.connect.stanbicbank.co.ke/api/sandbox/auth/oauth2/token';
  
        request.post({
            url: endpoint_auth_credentials,
            form: {
                client_id: 'ab820ecab4fba72aac48846c7b6277ba',
                client_secret: '38b3249107d20dbe05d029fd5b5fc464',
                scope: 'payments',
                grant_type: 'client_credentials'
            }
        }, (err, response, body) => {
            if (err) {
            console.log(err);
            reject(err)
            } else {
                const access_token = JSON.parse(body).access_token;

                resolve(access_token);
            }
        })

    })
    
}
  

const XYZ_stk =({phoneNumber, amount}) => {
    return new Promise(async(resolve,reject)=>{
        const auth = await XYZ_get_access_token();


        const options = {
            'method': 'POST',
            'url': 'https://api.connect.stanbicbank.co.ke/api/sandbox/mpesa-checkout',
            'headers': {
            'Authorization': 'Bearer AAIgYWI4MjBlY2FiNGZiYTcyYWFjNDg4NDZjN2I2Mjc3YmE_5hfBK1Z92HXQ1TC6-MDbFIxAwaA532HZc6ST4eEZpsE0RYZQel03LO96DzHAwMhL3wYxSRVzY0TTmeP5iQy-X6GmS0ENbzGsGwZ3lRMjGGPPq-anxIDigC7UDtvm79I',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "dbsReferenceId": "REW21331DR5F1",
                "billAccountRef": "3333562174",
                "amount": "10.00",
                "mobileNumber": phoneNumber,
                "corporateNumber": "740757",
                "bankReferenceId": "REW21331DR5F1",
                "txnNarrative": "ttsteeeee"
            })
        
        };
        request(options, async function (error, response) {
            if (error) throw new Error(error);
            const walletExists = await Wallets.findOne({number:`+${phoneNumber}`});
            console.log(walletExists)
              let balance =Number(walletExists.balance) + Number(amount)

              const updateWallet = await Wallets.findOneAndUpdate(
                  {number: `+${phoneNumber}`}, 
                  {
                      $set: {
                          balance : balance
                      },
                  })
                  
                 
            console.log(response.body);
        });

  
       
            
       
    })
    
}




const withdrawalToMpesa = ({phoneNumber, amount}) => {
    return new Promise(async(resolve,reject)=>{
        const auth = await XYZ_get_access_token();
        let endpoint_url = "https://api.connect.stanbicbank.co.ke/api/sandbox/mobile-payments";
    
        var options = {
            'method': 'POST',
            'url': 'https://api.connect.stanbicbank.co.ke/api/sandbox/mobile-payments',
            'headers': {
              'Authorization': 'Bearer AAIgNTA0YjhhZDk0NjNiZjMxOGFjYzA3OWEyZTVkMzI3ODaE_UP1425lKmrJxWnoItwNJ597MZlQuKmR2pZ3TxupV1KX9j2EafXRZRBE1LA5-gW4oA7dgUohkcY8jEeTsy6CJRirBwcMWbObNmbncADOBO6NKPzUzUu4Gm0jjl5bUvA',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "originatorAccount": {
                "identification": {
                  "mobileNumber": phoneNumber
                }
              },
              "requestedExecutionDate": "2022-12-01",
              "dbsReferenceId": "21899424079090" + "5",
              "txnNarrative": "TRANSACTION NARRATIVE",
              "callBackUrl": "http://client_domain.com/omnichannel/esbCallback",
              "transferTransactionInformation": {
                "instructedAmount": {
                  "amount": "10.00",
                  "currencyCode": "KES"
                },
                "mobileMoneyMno": {
                  "name": "MPESA"
                },
                "counterparty": {
                  "name": "J. Sparrow",
                  "mobileNumber": phoneNumber,
                  "postalAddress": {
                    "addressLine1": "Some street",
                    "addressLine2": "99",
                    "postCode": "1100 ZZ",
                    "town": "Amsterdam",
                    "country": "NL"
                  }
                },
                "remittanceInformation": {
                  "type": "UNSTRUCTURED",
                  "content": "SALARY"
                },
                "endToEndIdentification": "5e1a3da132cc"
              }
            })
          
          };
          request(options, function (error, response) {
            if (error) throw new Error(error);
            console.log(response.body);
          });



        request(
            {
                uri: endpoint_url,
                method: "POST",
                headers: {
                    Authorization: auth,
                },
                json:{
                    "originatorAccount": {
                        "identification": {
                            "mobileNumber": phoneNumber
                        }
                    },
                    "requestedExecutionDate": new Date(),
                    "dbsReferenceId": crypto.randomUUID(),
                    "txnNarrative": "TRANSACTION NARRATIVE",
                    "callBackUrl": "http://client_domain.com/omnichannel/esbCallback",
                    "transferTransactionInformation": {
                        "instructedAmount": {
                            "amount": amount,
                            "currencyCode": "KES"
                        },
                        "mobileMoneyMno": {
                            "name": "MPESA"
                        },
                        "counterparty": {
                            "name": "J. Sparrow",
                            "mobileNumber": phoneNumber,
                            "postalAddress": {
                                "addressLine1": "Some street",
                                "addressLine2": "99",
                                "postCode": "1100 ZZ",
                                "town": "Amsterdam",
                                "country": "NL"
                            }
                        },
                        "remittanceInformation": {
                            "type": "UNSTRUCTURED",
                            "content": "SALARY"
                        },
                        "endToEndIdentification": "5e1a3da132cc"
                    }
                }
            }
        )
        async(err, resp, body) => {
            if (err) {
                console.log(err);
            }
            
            const walletExists = await Wallets.findOne(req.args.phoneNumber);
            let balance = Number(walletExists.balance) - Number(req.body.amount)
            const updateWallet = await Wallets.findOneAndUpdate(
                {number: req.body.number}, 
                {
                    $set: {
                        balance : balance
                    },
                })
                console.log(response.body);
            }
    })
        
}

module.exports = {
    XYZ_get_access_token,
    XYZ_stk, 
    withdrawalToMpesa
}
// module.exports = get_access_token;
