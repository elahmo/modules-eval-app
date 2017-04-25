const express = require('express');
const router  = express.Router();
const Module  = require('../models/module');
const User = require('../models/user');
const passport	= require('passport');
require('../config/passport_config')(passport);
const jwt   = require('jwt-simple');


//----------------------------------------------------
// authentication helper functions
// ----------------------------------------------------

function requiresAuth(req, res, next) {
		const token = getToken(req.headers);
			if (token) {
				const decoded = jwt.decode(token, process.env.SECRET_OR_KEY);
				User.findById ({ _id: decoded._id }, (err, user) => {
					if (err)  return next(err);
						if (!user) {
							return res.status(403).send({success: false, message: 'Authentication failed. User not found.'});
						} else {
							req.user = user;
							next();
						}
				});
			} else {
				return res.status(403).send({success: false, message: 'No token provided.'});
			}
}


function getToken(headers) {
	if (headers && headers.authorization) {
		const parted = headers.authorization.split(' ');
		if (parted.length === 2) {
			return parted[1];
		} else {
			return null;
		}
	} else {
		return null;
  }
}

//----------------------------------------------------
// user signup/auth API
// ----------------------------------------------------
// create a new user account (POST http://localhost:8080/api/signup)
router.post('/signup', (req, res, next) => {
	if (!req.body.username || !req.body.password) return res.status(422).json({success: false, message: 'Please pass username and password.'});
	let newUser = new User({
		username: req.body.username,
		password: req.body.password,
		//this is hardcoded for now for development purposes
		modules: [{_id:"58e51e0475770423fccb1997", rating:2.5},
							{_id:"58e51e0475770423fccb1998", rating:4.0}]
	});
	//lookup for user
	User.findOne({username: req.body.username}, (err, user) => {
		if (err)  return next(err);
		//if user doest exist, save new user
		if (!user) {
			newUser.save((err) => {
				if (err)  return next(err);
				const token = jwt.encode({username: newUser.username, _id: newUser._id}, process.env.SECRET_OR_KEY);
				newUser.getModules((err, modules_arr) => {
					if (err)  return next(err);
					res.status(200).json({
							"success": true,
							"token": 'JWT ' + token,
							"user": {
									"_id": newUser._id,
									"username":newUser.username,
									"modules": modules_arr
							}
					});
				})
			})
			//if user exists send error
		} else {
			res.status(409).send({success: false, message:'Username is taken.'});
		}
	})
})
// create a new user account (POST http://localhost:8080/api/auth)
router.post('/auth', (req, res, next) => {
	if (!req.body.username || !req.body.password) return res.status(422).json({success: false, message: 'Please pass username and password.'});
  User.findOne({  username: req.body.username }, function(err, user) {
    if (err)  return next(err);

    if (!user) {
      res.status(404).json({success: false, message: 'Username not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
					const token = jwt.encode({username: user.username, _id: user._id}, process.env.SECRET_OR_KEY);
					user.getModules((err, modules_arr) => {
						if (err)  return next(err);
						res.status(200).json({
								"success": true,
								"token": 'JWT ' + token,
								"user": {
										"_id": user._id,
										"username":user.username,
										"modules": modules_arr
								}
						});
					})

        } else {
          res.status(401).send({success: false, message: 'Failed. Wrong password.'});
        }
      });
    }
  });
});
//----------------------------------------------------
// get user from the auth token
// ----------------------------------------------------
router.get('/user', requiresAuth, (req, res, next) => {
	const user = req.user;
	user.getModules((err, modules_arr) => {
		if (err)  return next(err);
		res.status(200).json({
				"success": true,
				"user": {
						"_id": user._id,
						"username":user.username,
						"modules": modules_arr
				}
		});
	})
});

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


//----------------------------------------------------
// post a rating for a module
// ----------------------------------------------------
router.route('/rating')
	.post((req, res, next) => {
		res.status(201).json({success: true, message: 'POST OK'});
	})
	.get((req, res, next) => {
		res.status(201).json({success: true, message: 'GET OK'});
	});


module.exports = router;
