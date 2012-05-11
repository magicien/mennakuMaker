var mongoose = require('mongoose');

exports.getCommentRandam = function(req, res){
	var CommentSchema = mongoose.model('comment');
	CommentSchema.count({}, function(err, count){
		if(!err){
			CommentSchema.findOne({seq:parseInt(Math.random()*count)}, function(err, comment){
				if(!err){
					res.json(comment);
				}else{
					res.send(err);
				}
			});
		}else{
			res.send(err);
		}
	});
};

