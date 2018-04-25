PebbleApi: A Crypto and Stock price tracker for My Data
=================
This project is a simple API that the Pebble Application "My Data" by bahbka can communicate with in order to display stock and cryptocurrency information. 

How to use
---------
Simply download and install My Data pebble application, run the API on a server, and use its address to have Pebble connect to it. Also, if you want cryptocurrency price information, append the 'crypto' query, setting it equal to the comma delimited cryptocurrency tickers. If you want stock price information, append the 'stock' query, setting it equal to the comma delimited stock tickers. If you want to have both crypto and stock price information, do the both aforementioned statements. 

### Example URL:
Here is an example on what to input for the "Server URL" field inside the My Data Pebble application:
https://google-cloud-project.appspot.com/?crypto=NEO,INS,NCASH,BTC&stock=NVDA,AAPL

In this case, the server is hosted in https://google-cloud-project.appspot.com/ and we want price information for NEO, INS, NCASH, BTC cryptocurrencies and NVDA, AAPL stocks. 

Notes
---------
In order to get stock pricing information, you must create a file named config.json in the same directory as index.js. The contents of this file should look like this:

{
	"ALPHAVANTAGE_API_KEY": "YOUR ALPHAVANTAGE API KEY"
}


