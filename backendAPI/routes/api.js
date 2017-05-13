const express = require('express');
const router  = express.Router();
const Module  = require('../models/module');
const User = require('../models/user');
const passport	= require('passport');
require('../config/passport_config')(passport);
const jwt   = require('jwt-simple');
const recom_amount = 3

//----------------------------------------------------
// authentication helper functions
// ----------------------------------------------------
function get_feeback(module, user){
	if (module !== null && module.FEEDBACKS !== undefined) {
			let index = module.FEEDBACKS.findIndex( (feedback) => feedback._id._id.toString() === user._id.toString())
			if (index !== -1) {
				module['current_user_feedback'] = {
					feedback: module.FEEDBACKS[index]['feedback'],
					rating:   module.FEEDBACKS[index]['local_rating']
				}
			} else {
				module['current_user_feedback'] = null
			}
		return module
	} else {
		return module
	}
}

function get_feebacks(modules, user){
	if (modules !== null){
		modules.forEach((mod) => {
			mod = get_feeback(mod, user)
		})
		return modules
	} else  {
		return modules
	}
}



function get_rid_of_field(obj, field){
	let newObj = Object.create(obj)
	newObj[field] = undefined
	return newObj
}

function slice_recomendations(user){
	if (user.modules !== undefined) {
	let modules_sliced = user.modules
		modules_sliced.forEach( (mod) => {
			if (mod._id.RECOMMENDATIONS !== undefined) {
				let recom =  mod._id.RECOMMENDATIONS.slice(0,recom_amount)
				mod._id.RECOMMENDATIONS = recom
			}
		})
		user.modules = modules_sliced
	}
	return user
}


function requiresAuth(req, res, next) {
		const token = getToken(req.headers);
			if (token) {
				const decoded = jwt.decode(token, process.env.SECRET_OR_KEY);
				//Find user by id, prepopulate modules nad return
				User.findById (decoded._id)
						.populate({ path: 'modules._id',	populate: { path: 'RECOMMENDATIONS._id'}})
						.exec((err, user) => {
							if (err)  return next(err);
								if (!user) {
									return res.status(403).send({success: false, message: 'Authentication failed. User not found.'});
								} else {
									req.user = user
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
		modules: [
							{_id:"58e51e0475770423fccb1997", local_rating:2.5},
							{_id:"58e51a2175770423fccb126f", local_rating:5.0}
						],
		details: !req.body.details ? {} : req.body.details
	});
	//lookup for user
	User.findOne({username: req.body.username}, (err, user) => {
		if (err)  return next(err);
		//if user doest exist, save new user
		if (!user) {
			newUser.save((err) => {
				if (err)  return next(err);
				const token = jwt.encode({username: newUser.username, _id: newUser._id}, process.env.SECRET_OR_KEY);
				newUser.populate({ path: 'modules._id',	populate: { path: 'RECOMMENDATIONS._id'}}, (err) => {
					if (err)  return next(err);
					res.status(200).json({
							"success": true,
							"token": 'JWT ' + token,
							"user": slice_recomendations(get_rid_of_field(newUser, 'password'))
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
	User.findOne({  username: req.body.username })
		.populate({ path: 'modules._id',	populate: { path: 'RECOMMENDATIONS._id'}})
		.exec((err, user) => {
	if (err)  return next(err);

	if (!user) {
		res.status(404).json({success: false, message: 'Username not found.'});
	} else {
		// check if password matches
		user.comparePassword(req.body.password, (err, isMatch) => {
		if (isMatch && !err) {
					const token = jwt.encode({username: user.username, _id: user._id}, process.env.SECRET_OR_KEY);
						if (err)  return next(err);
						res.status(200).json({
								"success": true,
								"token": 'JWT ' + token,
								"user": slice_recomendations(get_rid_of_field(user, 'password'))
						});
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
		res.status(200).json({
				"success": true,
				"user": slice_recomendations(get_rid_of_field(req.user, 'password'))
		});
});

//----------------------------------------------------
// get modules listing
// ----------------------------------------------------
router.route('/modules')

	// get all the modules (accessed at GET http://localhost:8080/api/modules)
	.get((req, res, next) => {
		Module.find()
			//disabled prepopulation for all modules, as it makes the endpoint painfully slow
			//.populate({ path: 'RECOMMENDATIONS._id'})
			//.slice('RECOMMENDATIONS', recom_amount)
			.exec((err, modules) => {
			if (err) return next(err)
			res.status(200).json({
				success: true,
				modules: modules
			});
		});
	});

// on routes that end in /modules/:module_id
// ----------------------------------------------------
router.route('/modules/:module_id')

	// get the module with that id
	.get(requiresAuth, (req, res, next) => {
		const user = req.user;
		const query = req.query
		let resp_fields = query['fields'] ? query['fields'].replace(",", " ") : ''
		let query_fields = query['fields'] ? query['fields'].replace(",", " ") : ''
		Module.findById(req.params.module_id)
			.populate({ path: 'RECOMMENDATIONS._id'})
			.populate({ path: 'FEEDBACKS._id'})
			.slice('RECOMMENDATIONS', recom_amount)
			.select(query_fields)
			.exec((err, module) => {
					if (module === null) return next("No module found with this id")
					if (err) return next(err)
						res.status(200).json({
							success: true,
							module: get_feeback(module, user)
							//module:module
						});
				})
	})
//----------------------------------------------------
// find a module by name
// ----------------------------------------------------
router.get('/modules/find/:name', requiresAuth, (req, res, next) => {
	//get the users modules first
	const user = req.user;
	Module.find({COURSE_LONG_TITLE: new RegExp(req.params.name, "i")})
		.populate({ path: 'RECOMMENDATIONS._id'})
		.populate({ path: 'FEEDBACKS._id'})
		.slice('RECOMMENDATIONS', recom_amount)
		.exec((err, modules) => {
		if (err) return next(err)
		res.status(200).json({success: true, message: 'Found following modules.', modules:get_feebacks(modules, user)});
	});
});

//----------------------------------------------------
// post a rating for a module
// ----------------------------------------------------
router.put('/feedback/:module_id', requiresAuth, (req, res, next) => {
	const user = req.user;
			if (!req.body.feedback || !req.body.rating) return res.status(422).json({success: false, message: 'Please pass feedback and rating values.'});
			user.leaveFeedback(req.params.module_id, req.body.feedback, req.body.rating, (err) => {
				if (err)  return next(err);
				res.status(200).json({success: true, message: 'Successfully added rating and feedback for the module.' });
			})
});
//----------------------------------------------------
// add a module to favourites
// ----------------------------------------------------
router.post('/favourite/:module_id', requiresAuth, (req, res, next) => {
	const user = req.user;
	//get the users modules first
	user.favouriteModule(req.params.module_id, (err) => {
		if (err)  return next(err);
		res.status(200).json({success: true, message: 'Successfully added module to the favourites.' });
	})
});
//----------------------------------------------------
// remove a module from favourites
// ----------------------------------------------------
router.post('/unfavourite/:module_id', requiresAuth, (req, res, next) => {
	const user = req.user;
	//get the users modules first
	user.unfavouriteModule(req.params.module_id, (err) => {
		if (err)  return next(err);
		res.status(200).json({success: true, message: 'Removed added module from the favourites.' });
	})
});

//----------------------------------------------------
// remove a module from favourites
// ----------------------------------------------------
router.put('/notes/:module_id', requiresAuth, (req, res, next) => {
	const user = req.user;
	if (!req.body.notes) return res.status(422).json({success: false, message: 'Please provide body of the notes'});
		Module.findById(req.params.module_id)
		.exec((err, module) => {
			if (err) return next(err)
			module.save((err) => {
				if (err) return next(err)
				res.status(200).json({success: true, message: 'Successfully changed the notes of the module.' });
			});
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
