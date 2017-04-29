const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;
const Course 			= require('./course');

const ModuleSchema   = new Schema({
	name: String,
	rating: [Number],
	RECOMMENDATIONS: [{
			_id:        {type: Schema.Types.ObjectId, ref: 'Course'} //def is the open data module
		}]
});

module.exports = mongoose.model('Module', ModuleSchema);
