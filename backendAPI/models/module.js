const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

//define schemas
const ModuleSchema   = new Schema({
	name: String
});

module.exports = mongoose.model('Module', ModuleSchema);
