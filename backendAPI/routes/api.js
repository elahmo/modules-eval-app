const express = require('express');
const router  = express.Router();
const Module  = require('../models/module');
const User = require('../models/user');

//----------------------------------------------------
// user signup/auth API
// ----------------------------------------------------
// create a new user account (POST http://localhost:8080/api/signup)
router.post('/signup', (req, res, next) => {
	if (!req.body.username || !req.body.password) return res.status(422).json({success: false, message: 'Please pass name and password.'});
	let newUser = new User({
		username: req.body.username,
		password: req.body.password
	});
	//lookup for user
	User.findOne({username: req.body.username}, (err, user) => {
		if (err)  return next(err);
		//if user doest exist, save new user
		if (!user) {
			newUser.save((err) => {
				if (err)  return next(err);
				res.status(201).json({success: true, message: 'New user crated.'});
			})
			//if user exists send error
		} else {
			res.status(409).send({success: false, message:'UserName is taken.'});
		}
	})
})
//----------------------------------------------------
// get modules listing
// ----------------------------------------------------
router.route('/modules')

	// create a module (accessed at POST http://localhost:8080/modules)
	.post((req, res, next) => {
		if (!req.body.name) return res.status(422).json({success: false, message: 'Please pass module name'});
		const module = new Module({
			name: req.body.name
		});		// create a new instance of the module model

		module.save((err) => {
			if (err) return next(err)
			res.status(201).json({success: true, message: 'Module Created!', req_body: req.body });
		});

	})

	// get all the modules (accessed at GET http://localhost:8080/api/modules)
	.get((req, res, next) => {
		Module.find((err, modules) => {
			if (err) return next(err)
			res.status(200).json({success: true, modules:modules});
		});
	});

// on routes that end in /modules/:module_id
// ----------------------------------------------------
router.route('/modules/:module_id')

	// get the module with that id
	.get((req, res, next) => {
		Module.findById(req.params.module_id, function(err, module) {
			if (err) return next(err)
			res.status(200).json({success: true, module:module});
		});
	})

	// update the module with this id
	.put((req, res, next) => {
		if (!req.body.name) return res.status(422).json({success: false, message: 'Please pass module name'});
		Module.findById(req.params.module_id, (err, module) => {
			if (err) next(err);
			module.name = req.body.name;
			module.save((err) => {
				if (err) return next(err);
				res.status(200).json({success: true,  message: 'Module updated!' });
			});

		});
	})

	// delete the module with this id
	.delete((req, res, next) => {
		Module.remove({ _id: req.params.module_id	}, (err) => {
			if (err) return next(err);
			res.status(200).json({success: true, message: 'Successfully deleted' });
		});
	});

//for /api simply dump out all the endpoints
	router.get('/', function(req, res) {
			res.send("The api supports following calls: " + JSON.stringify(
				router.stack
				.map(r => { return {"path": r.route.path , "methods": Object.keys( r.route.methods )}})
				.filter(r => r.path !== "/")
				)
			)
	});


module.exports = router;
