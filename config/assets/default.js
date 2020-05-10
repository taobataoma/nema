'use strict';

/* eslint comma-dangle:[0, "only-multiline"] */

module.exports = {
  server: {
    allJS: ['server.js', 'config/**/*.js', 'src/modules/*/server/**/*.js'],
    models: [
      'src/modules/app/server/models/**/*.js',
      'src/modules/*/server/models/**/*.js'
    ],
    routes: ['src/modules/!(app)/server/routes/**/*.js', 'src/modules/app/server/routes/**/*.js'],
    sockets: ['src/modules/*/server/sockets/**/*.js'],
    config: ['src/modules/*/server/config/*.js'],
    policies: ['src/modules/*/server/policies/*.js'],
    views: ['src/modules/*/server/views/*.html']
  }
};
