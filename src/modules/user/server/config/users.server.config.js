'use strict';

/**
 * Module dependencies
 */
var passport = require('passport'),
  User = require('mongoose').model('User'),
  path = require('path'),
  config = require(path.resolve('./config/config'));

/**
 * Module init function
 */
module.exports = function (app) {
  // Serialize sessions
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // Deserialize sessions
  passport.deserializeUser(function (id, done) {
    User.findOne({_id: id}, '-salt -password')
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
      // .populate('department', 'title businessPath businessType subs')

      .exec(function (err, user) {
        done(err, user);
      });
  });

  // Initialize strategies
  config.utils.getGlobbedPaths(path.join(__dirname, './strategies/**/*.js')).forEach(function (strategy) {
    require(path.resolve(strategy))(config);
  });

  // Add passport's middleware
  app.use(passport.initialize());
  app.use(passport.authenticate(['jwt', 'session']));
  // app.use(passport.session());
};
