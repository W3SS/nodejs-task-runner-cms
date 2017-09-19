const fs = require('fs');
const logger = require('../logs/log.json');

// update the existing logging json file
module.exports = function (logSuccess) {
	
	var logMsg = logSuccess.logMsg;
	var lvl = logSuccess.lvl;
	var logit = JSON.parse('{"level":"' + lvl + '","message":"' + logMsg + ' ' + lvl + '","timestamp":"' + (new Date).toLocaleTimeString() + '"}');
	
    logger.push(logit);
	
	fs.writeFile('./nodeRunner/logs/log.json', JSON.stringify(logger), 'utf8'), function (err) {if (err) throw err;};
	
};
