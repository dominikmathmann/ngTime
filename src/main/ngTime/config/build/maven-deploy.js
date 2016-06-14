var config = require('./maven-deploy-config');
var maven = require('maven-deploy');

maven.config(config);
maven.install();
