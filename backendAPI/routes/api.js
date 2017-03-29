const express = require('express');
const router  = express.Router();
const Module  = require('../models/module');

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

module.exports = router;
