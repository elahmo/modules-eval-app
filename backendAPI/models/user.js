const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;
const bcrypt 			 = require('bcrypt');
const Module 			= require('./module');
//define schemas
const UserSchema   = new Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	details: Object,
	modules : [{
    _id : String,
    rating : Number
     }]
});

//define mongo hooks
//save hashed and salted password
UserSchema.pre('save', function (next) {
	let user = this;
	if (this.isModified('password') || this.isNew) {
		bcrypt.genSalt(10, function (err,salt)  {
			if (err){
				return next(err);
			}
			bcrypt.hash(user.password, salt, function (err, hash) {
				if (err){
					return next(err);
				}
				user.password = hash;
				next();
			});
		});
	} else {
		return next()
	}
});
//compare entered and database saved psw
UserSchema.methods.comparePassword = function (passw, cb) {
	bcrypt.compare(passw, this.password, function (err, isMatch) {
	if (err) {
		return cb(err)
	}
	cb(null, isMatch);
	});
}

//prepopulate module array with objects
UserSchema.methods.getModules = function (cb) {
		const modules_arr = []
		console.log("this modules is");
		console.log(this.modules);
		this.modules.forEach((mod) => {
			Module.findById ({ _id: mod._id }, (err, m) => {
				if (err) return cb(err)
				modules_arr.push({module:m, your_rating:mod.rating})
				if (this.modules.length === modules_arr.length) cb(null, modules_arr);
			})
		});
}

module.exports = mongoose.model('User', UserSchema);
