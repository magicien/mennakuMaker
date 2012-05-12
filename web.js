var express = require('express');
var mongoose = require('mongoose');
var routes = require('./routes');

var app = express.createServer(express.logger());

var mongoUri = process.env.MONGOHQ_URL || 'mongodb://localhost/mennakudb';
var port = process.env.PORT || 3000;

var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
var CommentSchema = new Schema({
	seq: Number,
	message: String,
	name: String,
	age: String
});

var SnapSchema = new Schema({
	imageURI: String,
	message: String, 
	cssstyle: String,
	hoge: {
		body: String
	}
});

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
	mongoose.connect(mongoUri);
	mongoose.model('comment', CommentSchema);
	mongoose.model('snap', SnapSchema);
});

app.get('/', function(request, response) {
	response.send('Hello World!!');
});
app.get('/snap', routes.newSnap);
app.post('/snap', routes.createSnap);
app.get('/snap/:id', routes.getSnapById);
app.get('/sample', function(req, res){
	res.render('sample', {
		title: 'jade sample',
		message: 'hello, world!',
		arr: ['hoge', 'foo', 'bar']

	});
});
app.get('/comment/random', routes.getCommentRandam);

app.listen(port, function() {
	  console.log("Listening on " + port);
});
