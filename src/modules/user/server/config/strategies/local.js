'use strict';

/**
 * Module dependencies
 */
var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  User = require('mongoose').model('User');

module.exports = function () {
  // Use local strategy
  passport.use(new LocalStrategy({
    usernameField: 'userName',
    passwordField: 'password'
  }, function (usernameOrEmail, password, done) {
    User.findOne({
      $or: [{
        username: usernameOrEmail.toLowerCase()
      }, {
        email: usernameOrEmail.toLowerCase()
      }, {
        mobilePhone: usernameOrEmail.toLowerCase()
      }]
    })
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
        if (err) {
          return done(err);
        }
        if  (!user) {
          return done(null, false, {
            message: '该账户不存在(' + (new Date()).toLocaleTimeString() + ')'
          });
        } else {
          // if (!user.enabled) {
          //   return done(null, false, {
          //     message: '该账户被禁用(' + (new Date()).toLocaleTimeString() + ')'
          //   });
          // }
          if (!user.authenticate(password)) {
            return done(null, false, {
              message: '用户名密码错误(' + (new Date()).toLocaleTimeString() + ')'
            });
          }
        }

        return done(null, user);
      });
  }));
};
