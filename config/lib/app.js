'use strict';

/**
 * Module dependencies.
 */
var config = require('../config'),
  mongooseService = require('./mongoose'),
  express = require('./express'),
  chalk = require('chalk');

module.exports.init = function init(callback) {
  mongooseService.connect(function (mongooseConn) {
    // Initialize Models
    mongooseService.loadModels();

    // Initialize express
    var app = express.init(mongooseConn);
    if (callback) callback(app, mongooseConn, config);

  });
};

module.exports.start = function start(callback) {
  var _this = this;

  _this.init(function (app, mongooseConn, config) {

    // Start the app by listening on <port> at <host>
    app.listen(config.port, config.host, function () {
      // Create server URL
      var server = (process.env.NODE_ENV === 'secure' ? 'https://' : 'http://') + config.host + ':' + config.port;
      // Logging initialization
      console.log('--');
      console.log(chalk.green(config.app.title));
      console.log();
      console.log(chalk.green('Environment:     ' + process.env.NODE_ENV));
      console.log(chalk.green('Server:          ' + server));
      console.log(chalk.green('Database:        ' + config.db.uri));
      console.log(chalk.green('App version:     ' + config.meanjs.version));
      if (config.meanjs['meanjs-version'])
        console.log(chalk.green('MEAN.JS version: ' + config.meanjs['meanjs-version']));
      console.log('--');

      if (callback) callback(app, mongooseConn, config);
    });

  });

};
