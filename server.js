var express = require("express");

var app = express();

var mongo = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

dbUrl = "mongodb://localhost:27017/contactlist";

mongoose.connect(dbUrl);

/*************** MONGOose part starts here **************/
var Schema = mongoose.Schema;
var contactSchema = new Schema({
	name: String,
	email: String,
	number: String
},
{
	collection: 'contactlist'
});

var db = mongoose.model('contactlist', contactSchema);


/*************** MONGOose part endss here **************/


app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/"));
app.use(bodyParser.json());


app.get('/contactlist', function (req, res) {
	console.log("I recieved a GET request");

	db.find(function (err, docs) {
		//console.log(docs);
		res.json(docs);
	});
 /*
	var person1 = {
		name: "Tim",
		email: "tim@gmail.com",
		number: "(111) 111-1111"
	};

	var person2 = {
		name: "John",
		email: "john@gmail.com",
		number: "(222) 222-2222"
	};

	var person3 = {
		name: "Emily",
		email: "emily@gmail.com",
		number: "(333) 333-3333"
	};

	var contactlist = [person1, person2, person3];

	res.json(contactlist);
*/
});

app.post('/contactlist', function (req, res) {
	var contact = req.body;
	//console.log( contact );

	var tempContact = new db({name: contact.name, email: contact.email, number: contact.number});


	tempContact.save(function(err, doc) {
		res.json(doc);
	});

});

app.delete('/contactlist/:id', function (req, res) {

	var id = req.params.id;

	//console.log(id);

	db.remove({_id: id}, function(err, doc){
		res.json(doc);
	});

});

app.get('/contactlist/:id', function (req, res) {
	console.log("This is inside..");
	var id = req.params.id;

	db.find({_id: id}, function (err, docs) {
		console.log(docs);
		res.json(docs);
	});
});

app.put('/contactlist/:id', function (req, res) {
	var id = req.params.id;
	console.log(req.body.name);

	var condition = { _id: req.params.id};
	var update = { name: req.body.name, email: req.body.email, number: req.body.number};
	var options = {multi: true};

	db.update(condition, update, options, function(err, doc) {
		res.json(doc);
	});

    /*
	db.findAndModify(
		{
			query: {_id: req.params.id},
			update: {$set: {name: req.body.name, email: req.body.email, number:req.body.number}},
			new: true
		},
		function (err, doc) {
			res.json(doc);
		});
	*/
});
// app.get('/', function(req, res) {
// 	res.send("Hello world from server.js!");
// });

app.listen(3000);

console.log("server is running on port 3000");