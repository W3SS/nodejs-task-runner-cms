//PAGES
const os = require('os'),
path = require('path'),
data = require('../../config/data'),
config = require('../../data/groups/' + data.cmd + '.json'),
logger = require('../../logs/log.json'),
statistics = require('../../logs/statistics'),
build = require('../../logs/build'),
nodemonConf = require('../../../nodemon');

const stats = {
	platform: os.platform(),
	prelease: os.release(),
	ptype: os.type(),
	arch: os.arch(),
	cpu: os.cpus(),
	cpuUsage:process.cpuUsage(),
	freemem: os.freemem(),
	totalmem: os.totalmem(),
	nodemem:process.memoryUsage().rss,
	hostname: os.hostname(),
	loadavg: os.loadavg(),
	nodev:process.versions,
	uptime:process.uptime(),
	cwd:process.cwd()
}

exports.dashboard = (req, res) => {
	//home page
	res.render('index', {
		title: 'nodeRunner',
		config:config,
		data: data,
		logger:logger,
		stats:stats

	});
};

exports.edit = (req, res) => {
	//edit page
	res.render('edit', {
		title: 'Edit task',
		config:config,
		data: data,
		logger:logger,
		stats:stats

	});

};

exports.create = (req, res) => {
	//create page
	res.render('create', {
		title: 'Create task',
		config:config,
		data: data,
		logger:logger,
		stats:stats

	});

};

exports.templates = (req, res) => {
	//create page
	res.render('templates', {
		title: 'templates',
		config:config,
		data: data,
		logger:logger,
		stats:stats

	});

};

exports.editTpl = (req, res) => {
	//create page
	res.render('editTpl', {
		title: 'Edit templates',
		config:config,
		data: data,
		logger:logger,
		stats:stats

	});

};

exports.delete = (req, res) => {
	//delete page
	res.render('delete', {
		title: 'Delete task',
		config:config,
		data: data,
		logger:logger,
		stats:stats

	});

};

exports.waiting = (req, res) => {
	//waiting for task to complete page
	res.render('waiting', {
		waiting:true,
		title: 'Waiting',
		config:config,
		data: data,
		logger:logger,
		stats:stats


	});

};

exports.tools = (req, res) => {
	//waiting for task to complete page
	res.render('tools', {
		title: 'tools',
		config:config,
		data: data,
		logger:logger,
		stats:stats,
		build:build


	});

};

exports.settings = (req, res) => {

	res.render('settings', {
		title:'settings',
		config:config,
		data: data,
		logger:logger,
		stats:stats,
		nodemon:nodemonConf

	});

};

exports.group = (req, res) => {

	res.render('taskGroup', {
		title:'group settings',
		config:config,
		data: data,
		logger:logger,
		stats:stats
	});

};

exports.project = (req, res) => {

	res.render('project', {
		title:'project',
		config:config,
		data: data,
		logger:logger,
		stats:stats
	});

};

exports.status = (req, res) => {

 nRunner = path.join(process.cwd(),'nodeRunner');
	res.render('status', {
		title:'status',
		config:config,
		data: data,
		logger:logger,
		stats:stats,
		statistics:statistics,

		nRunner:nRunner


	});

};
