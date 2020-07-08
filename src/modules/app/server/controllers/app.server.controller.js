'use strict';

var validator = require('validator'),
  path = require('path'),
  config = require(path.resolve('./config/config'));

/**
 * Render the main application page
 */
exports.renderIndex = function (req, res) {
  var safeUserObject = null;
  if (req.user) {
    safeUserObject = {
      provider: validator.escape(req.user.provider),
      username: validator.escape(req.user.username),
      fullname: validator.escape(req.user.fullname),
      created: req.user.created,
      roles: req.user.roles,
      permissionsRole: req.user.permissionsRole,
      permissions: req.user.permissions,
      profileImageURL: req.user.profileImageURL,
      email: validator.escape(req.user.email),
      additionalProvidersData: req.user.additionalProvidersData
    };
  }

  res.render('dist/index', {
    user: JSON.stringify(safeUserObject),
    globalConfig: JSON.stringify(req.globalConfig || null)
  });
};

/**
 * Render the server error page
 */
exports.renderServerError = function (req, res) {
  res.status(500).render('src/modules/app/server/views/500', {
    error: 'Oops! Something went wrong...'
  });
};

/**
 * Render the server not found responses
 * Performs content-negotiation on the Accept HTTP header
 */
exports.renderNotFound = function (req, res) {

  res.status(404).format({
    'text/html': function () {
      res.render('src/modules/app/server/views/404', {
        url: req.originalUrl
      });
    },
    'application/json': function () {
      res.json({
        error: 'Path not found'
      });
    },
    'default': function () {
      res.send('Path not found');
    }
  });
};
