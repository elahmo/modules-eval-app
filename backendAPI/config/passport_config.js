const JwtStrategy = require('passport-jwt').Strategy;
const User = require('../models/user');

//export a function which
module.exports = (passport) => {
  process.env.SECRET_OR_KEY = "secretKey"
  passport.use(new JwtStrategy({secretOrKey: process.env.SECRET_OR_KEY}, (jwt_payload, done) => {
    User.findOne({id: jwt_payload.id}, (err, user) => {
          if (err) {
              return done(err, false);
          }
          if (user) {
              done(null, user);
          } else {
              done(null, false);
          }
      });
  }));
};
