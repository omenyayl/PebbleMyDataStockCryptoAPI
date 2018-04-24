const
    express = require('express'),
    bodyParser = require('body-parser'),
    routes = require('./api/routes/myDataRoutes'),
    fs = require('fs');

const APP = express();
const PORT = process.env.PORT || 8080;
const CONFIG_FILEPATH = "./config.json";

let configFile;

try{
	configFile = JSON.parse(fs.readFileSync(CONFIG_FILEPATH, 'utf-8'));
} catch(e) { console.log("WARNING: Cannot open and parse 'config.json'"); }


if(configFile && configFile.hasOwnProperty('ALPHAVANTAGE_API_KEY')){
	global.ALPHAVANTAGE_API_KEY = configFile['ALPHAVANTAGE_API_KEY'];
}

APP.use(bodyParser.urlencoded({ extended: true }));
APP.use(bodyParser.json());
routes(APP);
APP.listen(PORT);

console.log('My Data API server started on: ' + PORT);