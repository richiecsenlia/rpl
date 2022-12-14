

const querystring = require("querystring");

exports.handler = async (event, context)=>{
    // Only allow POST
    // if (event.httpMethod !== "POST") {
    //   return { statusCode: 405, body: "Method Not Allowed" };
    // }
  
    // When the method is POST, the name will no longer be in the event’s
    // queryStringParameters – it’ll be in the event body encoded as a query string
    // const params = querystring.parse(event.body);
    const totalHarga = event.queryStringParameters.totalHarga
    console.log(totalHarga)
    const midtransClient = require('midtrans-client');
	// Create Snap API instance
	let snap = new midtransClient.Snap({
	        // Set to true if you want Production Environment (accept real transaction).
	        isProduction : false,
	        serverKey : 'SB-Mid-server-YTu3-qbJnidy08GBmKPCki61'
	    });
	 
	let parameter = {
	    "transaction_details": {
	        "order_id": "YOUR-ORDERID-123456" + Math.random(),
	        "gross_amount": totalHarga
	    },
	    "credit_card":{
	        "secure" : true
	    },
	    "customer_details": {
	        "first_name": "budi",
	        "last_name": "pratama",
	        "email": "budi.pra@example.com",
	        "phone": "08111222333"
	    }
	};
	var transactionToken
	var transactionUrl
    
	await snap.createTransaction(parameter)
	    .then((transaction)=>{
	        // transaction token
	        transactionToken = transaction.token;
			transactionUrl = transaction.redirect_url;
	        console.log('transactionToken:',transactionToken);
	    })
    console.log(transactionToken)
    console.log('halo')
    const response = JSON.stringify({"token":transactionToken,"url":transactionUrl})
    return {
        statusCode: 200,
        body: response,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
        },
      };
    
  };
