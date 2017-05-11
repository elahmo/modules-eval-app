const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Course = require('./course');
//const User  = require('./user');

const ModuleSchema   = new Schema({
	name: String,
	NOTES: Object,
	FEEDBACKS: [{
			_id:         {type: Schema.Types.ObjectId, ref: 'User'}, //
			feedback:    String,
			local_rating: Number
		}],
	rating: [Number],
	RECOMMENDATIONS: [{
			_id:        {type: Schema.Types.ObjectId, ref: 'Course'} //def is the open data module
	}]
});

module.exports = mongoose.model('Module', ModuleSchema);
