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
	console.log(req.params.id);
	SnapSchema.findById(req.params.id, function(err, snap){
		if(!err){
			if(snap){
			res.render('snap',{
				title: 'MEN\'S KUNECKLE MAKER',
				snap: snap
			});
			}else{
				res.send(404);
			}
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
	//snap.imageURI = 'aaa.img';
	snap.imageURI = req.body.imageURI;
	//snap.message = 'ガイアが俺にかがやけ';
	snap.message = req.body.message;
	//snap.cssstyle= '{color:#fff;}';
	snap.cssstyle = req.body.cssstyle;
	snap.save(function(err){
		if(!err){
			res.json(snap);
		}else{
			res.send(err);
		}
	});
};
