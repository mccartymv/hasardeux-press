var fs = require('fs');
configPath = './config.json';
var parsed = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
exports.storageConfig = parsed;