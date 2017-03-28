// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');
var mongoose   = require('mongoose');
//require api
var api = require('./routes/api');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; // set our port
//configure db
//connect local
mongoose.connect('mongodb://127.0.0.1:27017'); // connect to our database
//conect to remote
//mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o'); // connect to our database

// Set up main route
// =============================================================================

// create our router
var router = express.Router();

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

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Listening at port' + port);
