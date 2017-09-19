const fs = require('fs');
const logTpl = '[{"level":"info","message":"Logger initiated","timestamp":"' + (new Date).toLocaleTimeString() + '"}]';
var logUrl = './nodeRunner/logs/log.json';
// create new logging instance each session
module.exports = function (initLogs) {

fs.writeFile(logUrl, logTpl, 'utf8'), function (err) {
			  if (err) throw err;

			};
	};
