const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;
const bcrypt 			 = require('bcrypt');
const Module 			 = require('./module');
const ObjectId    = Schema.Types.ObjectId;
//define schemas
const UserSchema   = new Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true,
	},
	details: Object,
	modules : [{
		_id			 : {type: ObjectId,  ref: 'Module'}, //def is the open data module
		local_rating : Number
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

//rate a module for the user
UserSchema.methods.rateModule = function (module_id, rating, cb) {
		let index = this.modules.findIndex((module) => module._id._id.toString() === module_id)
		//if index found remove and save, otherwise return an arro
		if (index !== -1) {
			//savae current rating
			let current_local_rating = this.modules[index].local_rating
			this.modules[index].local_rating = rating
			Module.findById(module_id, (err, module) => {
				if (err) return cb(err);
				//if user has not favorited yet, add as a new rating to the global module rating
				if (current_local_rating === null) {
					let new_num_raters = parseInt(module.rating[1]) + 1
					let new_tot_score = parseFloat(module.rating[0])*parseFloat(module.rating[1]) + parseFloat(rating)
					module.rating = [new_tot_score / new_num_raters, new_num_raters]
				//if user has already favourtie, substract the old rating from the total global and divived by the samen number of raters
				}else {
					let new_num_raters =  parseInt(module.rating[1])
					let new_tot_score = parseFloat(module.rating[0])*parseFloat(module.rating[1]) - parseFloat(current_local_rating) + parseFloat(rating)
					module.rating = [new_tot_score/new_num_raters, new_num_raters]
				}
				module.save((err) => {
						if (err) return cb(err);
						this.save((err) => {
								return cb(err);
						});
				});
			});
		} else {
			return cb('Module has to be favourited, before rating')
		}
}
//favourite module
UserSchema.methods.favouriteModule = function (module_id, cb) {
		//if already favourited array is favbourited, return an error
		if (this.modules.find((module) => module._id._id.toString() === module_id))
			return cb('Module is already favourited')
		this.modules.push({
			_id: module_id,
			local_rating: null
		});
		this.save((err) => {
				return cb(err);
		});
}
//unfavourite module
UserSchema.methods.unfavouriteModule = function (module_id, cb) {
		//find index
		let index = this.modules.findIndex((module) => module._id._id.toString() === module_id)
		//if index found remove and save, otherwise return an arro
		if (index !== -1) {
			this.modules.splice(index, 1);
			this.save((err) => {
					return cb(err);
			});
		} else {
			return cb('Module has to be favourited, before unfavourite is executed')
		}
}

module.exports = mongoose.model('User', UserSchema);
