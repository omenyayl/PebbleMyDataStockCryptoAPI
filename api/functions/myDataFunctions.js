const UrlAssembler = require('url-assembler');
const request = require('request-promise');
const formatCurrency = require('format-currency');

const STOCK_PRICES_TEMPLATE = "https://www.alphavantage.co/query";
const CRYPTO_PRICES_TEMPLATE = "https://min-api.cryptocompare.com/data/pricemulti";
const currencyFormat = { format: '%s%v', symbol: '$', maxFraction: 4 };

/**
 * Requests the alphavantage.co API for stock data;
 * @param {string} tickers comma delimited stock tickers (e.g. 'AAPL,NVDA').
 * @returns {Promise} Promise object that returns a string with stock price information. 
 */
exports.getStockPrices = function(tickers){
    return new Promise((resolve, reject)=>{
    	
    	if(global.ALPHAVANTAGE_API_KEY === undefined){
    		reject("Missing ALPHAVANTAGE_API_KEY from config.json");
    	}
    	
    	let apiKey = global.ALPHAVANTAGE_API_KEY;
    	
        const URL = UrlAssembler()
            .template(STOCK_PRICES_TEMPLATE)
            .query({
                function: "BATCH_STOCK_QUOTES",
                symbols: tickers,
                apikey: apiKey
            }).toString();
        
        request(URL)
            .then((res)=>{
                let returnString = "";

                let stockData = JSON.parse(res);
                let quotes = stockData['Stock Quotes'];

                quotes.forEach((quote)=>{
                   let price = formatCurrency(parseFloat(quote['2. price']), currencyFormat);
                   returnString += `${quote['1. symbol']}: ${price}\n`;
                });

                resolve(returnString);
            })
            .catch((e)=>{
                reject("Price request error:\n" + e);
            });
    });
};

/**
 * Requests the cryptocompare API for cryptocurrency data.
 * @param {string} tickers comma delimited cryptocurrency tickers (e.g. 'BTC,ETH').
 * @returns {Promise} Promise object with a string containing price information of the tickers provided.
 */
exports.getCryptoPrices = function(tickers){
	return new Promise((resolve, reject)=>{
		const URL = UrlAssembler()
			.template(CRYPTO_PRICES_TEMPLATE)
			.query({
				fsyms: tickers,
				tsyms: 'USD'
			}).toString();
		request(URL)
			.then((res)=>{
				let returnString = "";
				
				let cryptoData = JSON.parse(res);
				for(let ticker in cryptoData){
					if(cryptoData.hasOwnProperty(ticker)){
						let price = formatCurrency(parseFloat(cryptoData[ticker]['USD']), currencyFormat);
						returnString += `${ticker}: ${price}\n`;
					}
				}
				resolve(returnString);
			})
			.catch(()=>{
				reject("Price request error.");
			});
	});
};