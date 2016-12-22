$().ready(function() {
		

	$("#test1").click(function(){

		// Supported payment methods
		var supportedInstruments = [
				{
					supportedMethods: ['amex', 'discover','mastercard','visa']
				}
			];


		makePaymentCall(supportedInstruments);
	});




	$("#test2").click(function(){

		// Supported payment methods
		var supportedInstruments = [
			{
				supportedMethods: ['https://samsung.com/pay'],
				data: {
  					//product ID obtained from Samsung onboarding portal
  					'productId': '02510116604241796260',
  					'allowedCardNetworks': ['AMEX', 'mastercard', "visa"],
  					'paymentProtocol': "PROTOCOL_3DS",
  					'merchantName': "Shop Samsung (demo)",
  					'isReccurring': false,
  					'orderNumber': 1000,
  					'billingAddressRequired': "zipOnly"
			}
		}];


		makePaymentCall(supportedInstruments);
	});




	$("#test3").click(function(){

		// Supported payment methods
		var supportedInstruments = [
			{
				supportedMethods: ['https://samsung.com/pay'],
				data: {
  					//product ID obtained from Samsung onboarding portal
  					'allowedCardNetworks': ['AMEX', 'mastercard', "visa"],
  					'paymentProtocol': "PROTOCOL_3DS",
  					'merchantName': "Shop Samsung (demo)",
  					'isReccurring': false,
  					'orderNumber': 1000,
  					'billingAddressRequired': "zipOnly"
			}
		}];


		makePaymentCall(supportedInstruments);
	});




	$("#test4").click(function(){

		// Supported payment methods
		var supportedInstruments = [
			{
				supportedMethods: ['https://samsung.com/pay'],
				data: {
  					//product ID obtained from Samsung onboarding portal
  					'productId': '02510116604241796260',
  					'billingAddressRequired': "zipOnly"
				}
		}];


		makePaymentCall(supportedInstruments);
	});

































	function makePaymentCall(methods) {

			 if (!window.PaymentRequest) {
   				// PaymentRequest API is not available. Forwarding to
    			// legacy form based experience.
    			$("#not_supported").css("display", "block");
    			return;
  			}

			var supportedInstruments = methods;

  			if (!supportedInstruments) {
	  			// Supported payment methods
	  			supportedInstruments = [
					{
	    				supportedMethods: ['amex', 'discover','mastercard','visa']
	  				},
	  				{
	    				supportedMethods: ['https://samsung.com/pay'],
	    				data: {
	      					//product ID obtained from Samsung onboarding portal
	      					'productId': '02510116604241796260',
	      					'allowedCardNetworks': ['AMEX', 'mastercard', "visa"],
	      					'paymentProtocol': "PROTOCOL_3DS",
	      					'merchantName': "Shop Samsung (demo)",
	      					'isReccurring': false,
	      					'orderNumber': 1000,
	      					'billingAddressRequired': "zipOnly"
						}
				}];
			} 

			var details = {
				displayItems: [
			    	{
			      		label: prod_name,
			      		amount: { currency: "USD", value : prod_price.replace("$", "") }, // US$65.00
			    	},
			    	{
			      		label: "Loyal customer discount",
			      		amount: { currency: "USD", value : "-10.00" }, // -US$10.00
			      		pending: true // The price is not determined yet
			    	}
			  	],
			  	
			  	total:  {
			    	label: "Total",
			    	amount: { currency: "USD", value : prod_price.replace("$", "") }, // US$55.00
			  	},

			  	shippingOptions: [
				    {
				      id: 'standard',
				      label: 'Standard shipping',
				      amount: {currency: 'USD', value: '10.00'},
				      selected: true
				    },
				    {
				      id: 'express',
				      label: 'Express shipping',
				      amount: {currency: 'USD', value: '25.00'}
				    }
				]
			};

			var options = {
  		    	requestPayerEmail: true,
    			requestPayerName: true,
			    requestShipping: true,
  				shippingType: "shipping" // "shipping"(default), "delivery" or "pickup"
			};

			var payment = new PaymentRequest(
				supportedInstruments, // required payment method data
  				details,              // required information about transaction
  				options               // optional parameter for things like shipping, etc.
			);

			// Make PaymentRequest show to display payment sheet 
			payment.show().then(function(paymentResponse) {
				
				try {
				    console.log(JSON.stringify(paymentResponse));
				} catch(e) {
					console.error("JSON stringify failed");
				}

			    // Call complete to hide payment sheet
 			    paymentResponse.complete("success");

			    $("#result").text(JSON.stringify(paymentResponse))

			}).catch(function(err) {
				$("#result").text("ERROR:" + err.message)
			    console.error("Uh oh, something bad happened", err.message);
			});
	}

});
