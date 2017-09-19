const express = require('express'),
path = require('path'),
fs = require('fs'),
bodyParser = require('body-parser'),
urls = require('./nodeRunner/urls/urls'),
nunjucks = require('nunjucks'),
data = require('./nodeRunner/config/data.json'),
minifyOutput = require('./nodeRunner/controllers/minify'),
countStat = require('./nodeRunner/controllers/helpers/countStat'),
cacheTime = 86400000*data.cacheTiming,     // days
app = express().set("env", process.env.NODE_ENV || data.env);


// require nodeRunner
var index = require('./nodeRunner/controllers');

//app.set('views', path.join(__dirname, 'nodeRunner'));

app.set('view engine', 'njk');

//init nunjucks
nunjucks.configure('nodeRunner/' + urls.viewsDir, {
  autoescape: true,
  trimBlocks: true,
  lstripBlocks: true,
  express: app
});

nunjucks.installJinjaCompat();
//minify html output
if (data.minifyOutput === "on") {
	app.use(minifyOutput);
}

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));

if (data.cache === "off") {
  app.use(express["static"](path.join(__dirname, 'nodeRunner/' + urls.publicDir)));
} else {
  app.use(express["static"](path.join(__dirname, 'nodeRunner/' + urls.publicDir),{ maxAge: cacheTime }));
}

app.use('/', index);


app.set('view cache', true);
//console.log(app.get('view cache'))
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err;
  err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.status(err.status || 500);
  res.render('error');
});

//timed tasks
if (data.timedTask === "on") {
  var time = data.taskTime*60*1000;
  setInterval(function(){
    countStat('./', 'project')
    countStat('./nodeRunner/', 'nr');
    countStat('./node_modules/', 'nm');
  }, time);
}


module.exports = app;
