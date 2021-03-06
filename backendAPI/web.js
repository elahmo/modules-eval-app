const express    = require('express');
const bodyParser = require('body-parser');
const app        = express();
const api = require('./routes/api');
const router = express.Router();
const passport	= require('passport');
const port     = process.env.PORT || 8080; // set our port
const morgan     = require('morgan');
const mongoose   = require('mongoose');
const mongo_express = require('mongo-express/lib/middleware')
const mongo_express_config = require('./config/mongo_express_config')

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// configure morgan - log all reqeuests in terminal
app.use(morgan('dev'));
//init passport
app.use(passport.initialize());
//connect to the db
mongoose.connect(process.env.MONGODB_CONNECTION);
// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	// Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,X-ACCESS_TOKEN,Access-Control-Allow-Origin,Authorization,Origin,x-requested-with,Content-Type,Content-Range,Content-Disposition,Content-Description');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/)
router.get('/', function(req, res) {
	res.json({ message: 'hello dawg, this is backend api !' });
});

// register the routes -------------------------------
app.use('/', router);
app.use('/api', api);
app.use('/mongo_admin', mongo_express(mongo_express_config)) //login admin:admin

//define error handler, so that expections dont kill the app
app.use((err, req, res, next) => {
	console.error("[Error stack]:")
  console.error(err.stack)
	res.status(500).send({success:false, message:"An error has occured", error: 'Error: ' + err })
});
// start the server ------------------------------------
app.listen(port);
console.log('Running on localhost:' + port);
