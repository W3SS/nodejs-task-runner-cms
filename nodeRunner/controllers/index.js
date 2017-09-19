const express = require('express');
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');
const data = require('../config/data.json');
const pageRoutes = require('./pages/');
const apiRoutes = require('./api/');
const compileRoutes = require('./api/compile');

// PAGE ROUT EXPORTS
router.get('/', pageRoutes.dashboard);
router.get('/edit', pageRoutes.edit);
router.get('/create', pageRoutes.create);
router.get('/delete', pageRoutes.delete);
router.get('/waiting', pageRoutes.waiting);
router.get('/settings', pageRoutes.settings);
router.get('/group', pageRoutes.group);
router.get('/status', pageRoutes.status);
router.get('/tools', pageRoutes.tools);
router.get('/project', pageRoutes.project);
router.get('/templates', pageRoutes.templates);
router.get('/editTpl', pageRoutes.editTpl);

// API ROUT EXPORTS
router.post('/update', apiRoutes.update);
router.post('/modTask', apiRoutes.modTask);
router.post('/buildTask', apiRoutes.buildTask);
router.post('/createGroup', apiRoutes.createGroup);
router.post('/deleteGroup', apiRoutes.deleteGroup);
router.post('/backupTaskGroup', apiRoutes.backupTaskGroup);
router.post('/theme', apiRoutes.theme);
router.post('/fonts', apiRoutes.fonts);
router.post('/compilers', apiRoutes.compilers);
router.post('/port', apiRoutes.port);
router.post('/env', apiRoutes.env);
router.post('/options', apiRoutes.options);
router.post('/debugMode', apiRoutes.debugMode);
router.post('/waitTiming', apiRoutes.waitTiming);
router.post('/timedTasks', apiRoutes.timedTasks);
router.post('/cacheTiming', apiRoutes.cacheTiming);
router.post('/delayTiming', apiRoutes.delayTiming);
router.post('/createProject', apiRoutes.createProject);
router.post('/deleteProject', apiRoutes.deleteProject);
router.post('/createTpl', apiRoutes.createTpl);
router.post('/newTpl', apiRoutes.newTpl);
router.post('/deleteTpl', apiRoutes.deleteTpl);

//tools
router.post('/minNm', apiRoutes.minNm);
router.post('/prnNm', apiRoutes.prnNm);
router.post('/refreshNm', apiRoutes.refreshNm);
router.post('/cleanNm', apiRoutes.cleanNm);
router.post('/deleteNm', apiRoutes.deleteNm);
router.post('/buildNmList', apiRoutes.buildNmList);
router.post('/editNmList', apiRoutes.editNmList);
router.post('/bakNm', apiRoutes.bakNm);
router.post('/bakSite', apiRoutes.bakSite);
router.post('/rmDepend', apiRoutes.rmDepend);

if (data.traverse === "on") {
router.post('/modProject', apiRoutes.modProject);
};
if (data.console === "on") {
router.post('/customCMD', apiRoutes.customCMD);
};
if (data.logs === "on") {
	router.post('/clearLogs', apiRoutes.clearLogs);
};
if (data.logStats === "on") {
	router.post('/resetLogs', apiRoutes.resetLogs);
};
router.post('/backupLogs', apiRoutes.backupLogs);

//compile/compress styles/js
router.post('/compressJs', compileRoutes.compressJs);
if (data.compiler === 'stylus') {
	router.post('/compileStylus', compileRoutes.compileStylus);
} else if (data.compiler === 'scss') {
	router.post('/compileScss', compileRoutes.compileScss);
} else if (data.compiler === 'sass') {
	router.post('/compileSass', compileRoutes.compileSass);
} else if (data.compiler === 'less') {
	router.post('/compileLess', compileRoutes.compileLess);
}


module.exports = router;
