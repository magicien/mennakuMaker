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


exports.getSnapById = function(req, res){
	var SnapSchema = mongoose.model('snap');
	SnapSchema.findById(req.param.id, function(err, snap){
		if(!err){
			res.render({
				title: 'snap',
				snap: snap
			});
		}else{
			res.send(err);
		}
	});
};

exports.newSnap = function(req, res){
	res.render('create', {
		title: 'create'
	});
};

exports.createSnap = function(req, res){
	var SnapSchema = mongoose.model('snap');
	var snap = new SnapSchema();
	snap.imageURI = 'aaa.img';
	snap.message = 'ガイアが俺にかがやけ';
	snap.cssstyle= '{color:#fff;}';
	snap.save(function(err){
		if(!err){
			res.json(snap);
		}else{
			res.send(err);
		}
	});
};
