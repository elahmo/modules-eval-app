const express = require('express');
const router  = express.Router();
const Module  = require('../models/module');
const User = require('../models/user');

//----------------------------------------------------
// user signup/auth API
// ----------------------------------------------------
// create a new user account (POST http://localhost:8080/api/signup)
// router.post('/signup', (req, res) => {
// 	if (!req.body.username || !req.body.password) {
// 		return res.status(422).json({success: false, msg: 'Please pass name and password.'});
// 	} else {
// 		let newUser = new User({
// 			username: req.body.username,
// 			password: req.body.password
// 		});
// 		//lookup for user
// 		User.findOne({username: req.body.username}, (err, user) => {
// 			if (err)  return res.status(500).json({success: false, msg: 'Error:' + err});
// 			//if user doest exist, save new user
// 			if (!user) {
// 				newUser.save((err) => {
// 					if (err) return res.status(500).json({success: false, msg: 'Error:' + err});
// 					return res.status(201).json({success: true, msg: 'New user crated.'});
// 				})
// 				//if user exists send error
// 			} else {
// 				return res.status(409).send({success: false, msg:'UserName is taken.'});
// 			}
// 		})
// 	}
// })
router.post('/signup', function(req, res, next) {
  if (!req.body.username || !req.body.password) {
    res.json({success: false, msg: 'Please pass name and password.'});
  } else {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
         res.status(500).json({success: false, msg: 'Error:' + err});
         return next(err)
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});
//----------------------------------------------------
// get modules listing
// ----------------------------------------------------
router.route('/modules')

	// create a module (accessed at POST http://localhost:8080/modules)
	.post((req, res) => {

		const module = new Module();		// create a new instance of the module model

		try { // try to the necessary info, if not present, return an arror, doest seem to work for now
		module.name = req.body.name;
		} catch (er) {
				res.send(er);
		}

		module.save(function(err) {
			if (err)
				res.send(err);
			res.json({ message: 'Module Created!', req_body: req.body });
		});

	})

	// get all the modules (accessed at GET http://localhost:8080/api/modules)
	.get((req, res) => {
		Module.find(function(err, modules) {
			if (err)
				res.send(err);

			res.json(modules);
		});
	});

// on routes that end in /modules/:module_id
// ----------------------------------------------------
router.route('/modules/:module_id')

	// get the module with that id
	.get((req, res) => {
		Module.findById(req.params.module_id, function(err, module) {
			if (err)
				res.send(err);
			res.json(module);
		});
	})

	// update the module with this id
	.put((req, res) => {
		Module.findById(req.params.module_id, (err, module) => {

			if (err)
				res.send(err);

			try { // try to the necessary info, if not present, return an arror
			const body = req.body;
			module.name = body.name;
			} catch (er) {
				//res.send(er);
				res.send("error")
			}

			module.save((err) => {
				if (err)
					res.send(err);

				res.json({ message: 'Module updated!' });
			});

		});
	})

	// delete the module with this id
	.delete((req, res) => {
		Module.remove({
			_id: req.params.module_id
		}, (err) => {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
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
