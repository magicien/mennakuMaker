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
	snap = snapFromBody(snap, req);
	snap.save(function(err){
		if(!err){
			res.json(snap);
		}else{
			res.send(err);
		}
	});
};

exports.updateSnap = function(req, res){
	var SnapSchema = mongoose.model('snap');
	SnapSchema.findById(req.params.id, function(err, snap){
		if(!err){
			if(snap){
				//snap.imageURI = req.body.imageURI;
				//snap.message = req.body.message;
				//snap.cssstyle = req.body.cssstyle;
				snap = snapFromBody(snap, req);
				snap.save(function(err){
					if(!err){
						res.render('snap', {
							title: 'MEN\'S KUNECKLE MAKER',
							snap: snap
						});
					}else{
						res.send(err);
					}
				});
			}else{
				res.send(404);
			}
		}else{
			res.send(err);
		}
	});
};

var snapFromBody =function(snap, req){
	snap.imageURI = req.body.imageURI;
	snap.message = req.body.message;
	snap.transform = {};
	snap.transform.left = req.body.transleft;
	snap.transform.top= req.body.transtop;
	snap.transform.rotate= req.body.transrotate;
	snap.decoration={};
	snap.decoration.fontSize= req.body.decoFontSize;
	snap.decoration.color= req.body.decoColor;
	snap.decoration.textShadow={};
	snap.decoration.textShadow.x=1;
	snap.decoration.textShadow.y=1;
	snap.decoration.textShadow.blur=10;
	snap.decoration.textShadow.color=req.body.decoShadowColor;
	return snap;
};
