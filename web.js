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

app.configure(function(){
	mongoose.connect(mongoUri);
	mongoose.model('comment', CommentSchema);
});

app.get('/', function(request, response) {
	response.send('Hello World!!');
});
app.get('/comment/random', routes.getCommentRandam);

app.listen(port, function() {
	  console.log("Listening on " + port);
});
