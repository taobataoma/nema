'use strict';

module.exports = function (application) {
  // Root routing
  var app = require('../controllers/app.server.controller');

  // Define error pages
  application.route('/server-error').get(app.renderServerError);

  // Return a 404 for all undefined api, module or lib routes
  application.route('/:url(api|mapi|src|lib)/*').get(app.renderNotFound);

  // Define application route
  application.route('/*').get(app.renderIndex);
};
