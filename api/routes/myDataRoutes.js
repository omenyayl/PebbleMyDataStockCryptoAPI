'use strict';
const myDataController = require('../controllers/myDataController');

module.exports = function(app) {
    // myDataController Routes
    app.route('/')
        .get(myDataController.main);
};
