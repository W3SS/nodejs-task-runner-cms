//backup data.config file
const zlib = require('zlib');
const gzip = zlib.createGzip();
const fs = require('fs');



module.exports = function (backupConf) {
	var confInBak = fs.createReadStream('./nodeRunner/config/data.json');
	var confOutBak = fs.createWriteStream('./nodeRunner/backup/config/data.json.gz');
	confInBak.pipe(gzip).pipe(confOutBak);
};
