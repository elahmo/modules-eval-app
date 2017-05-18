const JwtStrategy = require('passport-jwt').Strategy;
const  ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

//define key
process.env.SECRET_OR_KEY = "somekeynobodyknowsabout"

//define opts
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = process.env.SECRET_OR_KEY;

//export a function which
module.exports = (passport) => {
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
      User.findOne({id: jwt_payload.id}, function(err, user) {
          if (err) {
              return done(err, false);
          }
          if (user) {
              done(null, user);
          } else {
              done(null, false);
              // or you could create a new account
          }
      });
  }));
};
