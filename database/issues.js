var mongodb = require('./mongo')
var mongo = require("mongodb")
	
exports.getAllIssues = function (req,res) {
	mongodb.findAll("issues", function (err,result) {
		if (err){
			console.log(err);
			res.status(500).send({});
		} else {
			res.status(200).send(result);
		}
	});
}


exports.updateTitle = function (req,res) {
	let id = mongo.ObjectID(req.body.id)
	let text = req.body.text
	mongodb.updateTitle("issues", id, text, function (err,result) {
		if (err){
			console.log(err);
			res.status(500).send({});
		} else {
			res.status(200).send({message:"Updated title!"});
		}
	});
}


exports.updateDescription = function (req,res) {
	let id = mongo.ObjectID(req.body.id)
	let text = req.body.text
	mongodb.updateDescription("issues", id, text, function (err,result) {
		if (err){
			console.log(err);
			res.status(500).send({});
		} else {
			res.status(200).send({message:"Updated description!"});
		}
	});
}

exports.updateSeverity = function (req,res) {
	let id = mongo.ObjectID(req.body.id)
	let text = req.body.text
	mongodb.updateSeverity("issues", id, text, function (err,result) {
		if (err){
			console.log(err);
			res.status(500).send({});
		} else {
			res.status(200).send({message:"Updated severity"});
		}
	});
}

exports.updateStatus = function (req,res) {
	let id = mongo.ObjectID(req.body.id)
	let text = req.body.text
	mongodb.updateStatus("issues", id, text, function (err,result) {
		if (err){
			console.log(err);
			res.status(500).send({});
		} else {
			res.status(200).send({message:"Updated status"});
		}
	});
}

exports.addNewIssue = function (req,res) {
	let id = mongo.ObjectID(req.body.id)
	let issue = {
		title: "title",
		description: "description",
		severity: " ",
		status: " "
	}

	mongodb.insert("issues", issue, function (err,result) {
		if (err){
			console.log(err);
			res.status(500).send({});
		} else {
			res.status(200).send({message:"Added new issue"});
		}
	});
}

exports.deleteIssue = function (req,res) {
	let id = mongo.ObjectID(req.body.id)

	mongodb.deleteByID("issues", id, function (err,result) {
		if (err){
			console.log(err);
			res.status(500).send({});
		} else {
			res.status(200).send({message:"Deleted issue"});
		}
	});
}