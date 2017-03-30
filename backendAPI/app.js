// BASE SETUP
// =============================================================================

// call the packages we need
const express    = require('express');
const bodyParser = require('body-parser');
const app        = express();
const morgan     = require('morgan');
const mongoose   = require('mongoose');
//set up mongoDB admin interface
const mongo_express = require('mongo-express/lib/middleware')
const mongo_express_config = require('./mongo_express_config')

//require api
const api = require('./routes/api');

// configure morgan - all reqeuests
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//set the port
const port     = process.env.PORT || 8080; // set our port
//connect to the db
mongoose.connect(process.env.MONGODB_CONNECTION);

// Set up main route
// =============================================================================

// create our router
const router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hello dawg, this is api!' });
});

// REGISTER OUR ROUTES -------------------------------
app.use('/', router);
app.use('/api', api);
app.use('/mongo_admin', mongo_express(mongo_express_config)) //login admin:admin
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Running on localhost:' + port);
