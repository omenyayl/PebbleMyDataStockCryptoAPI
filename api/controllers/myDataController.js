const functions = require('../functions/myDataFunctions');

const dataToSend = {
    "content": "",
    "refresh": 60,
    "vibrate": 0,
    "font": 4,
    "theme": 0,
    "scroll": 33,
    "light": 0,
    "blink": 0,
    "updown": 1
};

/**
 * This function requests stock and crypto APIs, modifies dataToSend.content to include price information, and returns a JSON dataToSend.
 * @param {Object} req request object.
 * @param {Object} res response object.
 */
exports.main = async function(req, res){
    const query = req.query;
    
    dataToSend.content = "";
    
    try {
    	if(query.hasOwnProperty('crypto'))
        	dataToSend.content += await functions.getCryptoPrices(query['crypto']);

    } catch(e){
        dataToSend.content += "Error: Crypto API";
        console.error("Error requesting cryptocurrency API, here is the error: \n" + e);
    }
    
    try{
   	if(query.hasOwnProperty('stock'))
       		dataToSend.content += await functions.getStockPrices(query['stock']);
    } catch(e){
    	dataToSend.content += "Error: Stock API";
    	console.error("Error requesting stock API, here is the error: \n" + e);
    }
    
    if(query['select'] === '1'){
	console.log("Select pressed!");
    }
    else if(query['up'] === '1'){
        console.log("Up pressed!");
    }
    else if(query['down'] === '1'){
        console.log("Down pressed!");
    }

    res.json(dataToSend);
};
