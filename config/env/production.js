'use strict';

var fs = require('fs');

module.exports = {
  secure: {
    ssl: false,
    privateKey: './config/sslcerts/key.pem',
    certificate: './config/sslcerts/cert.pem',
    caBundle: './config/sslcerts/cabundle.crt'
  },
  port: process.env.PORT || 3000,
  // Binding to 127.0.0.1 is safer in production.
  host: process.env.HOST || '0.0.0.0',
  db: {
    uri: process.env.MONGOHQ_URL || process.env.MONGODB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/sso',
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
      /**
      * Uncomment to enable ssl certificate based authentication to mongodb
      * servers. Adjust the settings below for your specific certificate
      * setup.
      * for connect to a replicaset, rename server:{...} to replset:{...}

      ssl: true,
      sslValidate: false,
      checkServerIdentity: false,
      sslCA: fs.readFileSync('./config/sslcerts/ssl-ca.pem'),
      sslCert: fs.readFileSync('./config/sslcerts/ssl-cert.pem'),
      sslKey: fs.readFileSync('./config/sslcerts/ssl-key.pem'),
      sslPass: '1234'

      */
    },
    // Enable mongoose debug mode
    debug: process.env.MONGODB_DEBUG || false
  },
  log: {
    // logging with Morgan - https://github.com/expressjs/morgan
    // Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
    format: process.env.LOG_FORMAT || 'combined',
    fileLogger: {
      directoryPath: process.env.LOG_DIR_PATH || process.cwd(),
      fileName: process.env.LOG_FILE || 'app.log',
      maxsize: 2097152,
      maxFiles: 20,
      json: false
    }
  },
  mailer: {
    from: process.env.MAILER_FROM || '481777@qq.com',
    options: {
      service: process.env.MAILER_SERVICE_PROVIDER || 'QQ',
      port: 465,
      auth: {
        user: process.env.MAILER_EMAIL_ID || '481777@qq.com',
        pass: process.env.MAILER_PASSWORD || 'nrtdheqofksmbhbi'
      }
    }
  }
};
