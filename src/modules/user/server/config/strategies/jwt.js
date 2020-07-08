'use strict';

/**
 * Module dependencies
 */
var passport = require('passport'),
  JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt,
  User = require('mongoose').model('User');

module.exports = function (config) {
  // Use jwt strategy
  passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt.secret
  }, function (payload, done) {
    // console.log('payload:', payload);
    User.findById(payload.id)
      // .populate({
      //   path: 'permissionsRole',
      //   select: 'name',
      //   populate: {
      //     path: 'permissions',
      //     select: 'key -_id',
      //     model: 'Permission'
      //   }
      // })
      // .populate('permissions', 'key -_id')
      .exec(function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {
            message: 'Invalid access token (' + (new Date()).toLocaleTimeString() + ')'
          });
        }

        return done(null, user);
      });
  }));
};
