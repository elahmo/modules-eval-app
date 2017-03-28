var express = require('express');
var router  = express.Router();
var Module  = require('../models/module');

// get modules listing
// ----------------------------------------------------
router.route('/modules')

	// create a bear (accessed at POST http://localhost:8080/bears)
	.post(function(req, res) {

		var module = new Module();		// create a new instance of the Bear model
		module.name = req.body.name;  // set the bears name (comes from the request)

		module.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Module Created!' });
		});

	})

	// get all the modules (accessed at GET http://localhost:8080/api/modules)
	.get(function(req, res) {
		Module.find(function(err, modules) {
			if (err)
				res.send(err);

			res.json(modules);
		});
	});

// on routes that end in /modules/:module_id
// ----------------------------------------------------
router.route('/modules/:module_id')

	// get the bear with that id
	.get(function(req, res) {
		Module.findById(req.params.module_id, function(err, module) {
			if (err)
				res.send(err);
			res.json(module);
		});
	})

	// update the bear with this id
	.put(function(req, res) {
		Module.findById(req.params.module_id, function(err, module) {

			if (err)
				res.send(err);
      console.log(req)
			module.name = req.body.name;
			module.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Module updated!' });
			});

		});
	})

	// delete the bear with this id
	.delete(function(req, res) {
		Module.remove({
			_id: req.params.module_id
		}, function(err, module) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});

module.exports = router;
